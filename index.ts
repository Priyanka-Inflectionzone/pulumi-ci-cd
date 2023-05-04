import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

//Create VPC
const main = new aws.ec2.Vpc("dev-vpc", {
    cidrBlock: "10.0.0.0/16",
    instanceTenancy: "default",
    tags: {
        Name: "dev-vpc",
    },
});

// Create one public and one private subnet
const publicSubnet = new aws.ec2.Subnet("dev-public-subnet", {
    vpcId: main.id,
    cidrBlock: "10.0.1.0/24",
    availabilityZone: "ap-south-1c",
    mapPublicIpOnLaunch: true,
    tags: {
        Name: "dev-public-subnet",
    },
});

const privateSubnet = new aws.ec2.Subnet("dev-private-subnet", {
    vpcId: main.id,
    cidrBlock: "10.0.2.0/24",
    availabilityZone: "ap-south-1b",
    tags: {
        Name: "dev-private-subnet",
    },
});

//Configure an Internet Gateway
const gw = new aws.ec2.InternetGateway("dev-igw", {
    vpcId: main.id,
    tags: {
        Name: "dev-igw",
    },
});

// Route tables for two subnets
const publicRt = new aws.ec2.RouteTable("dev-public-rt", {
    vpcId: main.id,
    routes: [
        {
            cidrBlock: "0.0.0.0/0",
            gatewayId: gw.id,
        },
        
    ],
    tags: {
        Name: "dev-public-rt",
    },
});

const privateRt = new aws.ec2.RouteTable("dev-private-rt", {
    vpcId: main.id,
    routes: [
        {
            cidrBlock: "0.0.0.0/0",
            gatewayId: gw.id,
        }
    ],
    tags: {
        Name: "dev-private-rt",
    },
}); 

const publicRtAssociation = new aws.ec2.RouteTableAssociation("public-rt-association", {
    subnetId: publicSubnet.id,
    routeTableId: publicRt.id,
}); 

const privateRtAssociation = new aws.ec2.RouteTableAssociation("private-rt-association", {
    subnetId: privateSubnet.id,
    routeTableId: privateRt.id,
});

// Create Security group for EC2 instance

const devSG = new aws.ec2.SecurityGroup("dev-sg", {
    description: "EC2 Security Group",
    vpcId: main.id,
    ingress: [{
        description: "Allow HTTPS",
        fromPort: 443,
        toPort: 443,
        protocol: "tcp",
        cidrBlocks: ["0.0.0.0/0"],
    },
    {
        description: "Allow HTTP",
        fromPort: 80,
        toPort: 80,
        protocol: "tcp",
        cidrBlocks: ["0.0.0.0/0"],
    },
    {
        description: "Allow SSH",
        fromPort: 22,
        toPort: 22,
        protocol: "tcp",
        cidrBlocks: ["0.0.0.0/0"],
    },
    {
        description: "Allow requests at 3000",
        fromPort: 3000,
        toPort: 3000,
        protocol: "tcp",
        cidrBlocks: ["0.0.0.0/0"],
    },
    ],
    egress: [{
        fromPort: 0,
        toPort: 0,
        protocol: "-1",
        cidrBlocks: ["0.0.0.0/0"],
        ipv6CidrBlocks: ["::/0"],
    }],
    tags: {
        Name: "dev-sg",
    },
});

//Userdata script 
const userData= 
`#!/bin/bash
apt-get update
apt-get install -y cloud-utils apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
apt-get update
apt-get install -y docker-ce
usermod -aG docker ubuntu
apt-get install -y awscli 
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 623865992637.dkr.ecr.ap-south-1.amazonaws.com 
docker rm -f app-container nginx
docker run -d --name app-container -p 3000:3000 -e VIRTUAL_HOST="$(aws ssm get-parameter --region "ap-south-1" --name "publicIP" --query Parameter.Value --output text)" -e BACKEND_API_URL="http://backend:3456" 623865992637.dkr.ecr.ap-south-1.amazonaws.com/demo:latest
docker run -d -p 80:80 --name nginx -v /var/run/docker.sock:/tmp/docker.sock -t jwilder/nginx-proxy `;

const config = new pulumi.Config();

let keyName: pulumi.Input<string> | undefined = config.get("keyName");
const publicKey = config.get("publicKey");

// The privateKey associated with the selected key must be provided (either directly or base64 encoded).
const privateKey = config.requireSecret("privateKey").apply(key => {
    if (key.startsWith("-----BEGIN RSA PRIVATE KEY-----")) {
        return key;
    } else {
        return Buffer.from(key, "base64").toString("ascii");
    }
});

if (!keyName) {
    if (!publicKey) {
        throw new Error("must provide one of `keyName` or `publicKey`");
    }
    const key = new aws.ec2.KeyPair("key", { publicKey });
    keyName = key.keyName;
} 

const ubuntu = aws.ec2.getAmi({
    mostRecent: true,
    filters: [
        {
            name: "name",
            values: ["ubuntu*-20.04-amd64-*"],
        },
        {
            name: "virtualization-type",
            values: ["hvm"],
        },
    ],
    owners: ["amazon"],
});

// Create an IAM role for the EC2 instance
const role = new aws.iam.Role("ssm-parameter-role", {
    assumeRolePolicy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Action: "sts:AssumeRole",
            Principal: {
                Service: "ec2.amazonaws.com",
            },
            Effect: "Allow",
            Sid: "",
        }],
    }),
});

// Attach the AmazonSSMManagedInstanceCore policy to the role
const policy = new aws.iam.Policy("ssm-parameter-policy", {
    policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Effect: "Allow",
            Action: [
                "ssm:GetParameter",
                "ssm:GetParameters",
                "ssm:GetParametersByPath",
            ],
            Resource: "*",
        }],
    }),
});

new aws.iam.RolePolicyAttachment("ssm-parameter-policy-attachment", {
    policyArn: policy.arn,
    role: role.name,
});

// Attach the AmazonRDSReadOnlyPolicy policy to the role
const policy2 = new aws.iam.Policy("rds-readOnly-policy", {
    policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Effect: "Allow",
            Action: [
                "rds:Describe*",
                "rds:ListTagsForResource",
                "ec2:DescribeAccountAttributes",
                "ec2:DescribeAvailabilityZones",
                "ec2:DescribeInternetGateways",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeSubnets",
                "ec2:DescribeVpcAttribute",
                "ec2:DescribeVpcs",
            ],
            Resource: "*",
        }],
    }),
});

new aws.iam.RolePolicyAttachment("rds-readOnly-policy-attachment", {
    policyArn: policy2.arn,
    role: role.name,
}); 

new aws.iam.RolePolicyAttachment("ECR-Readonly-policy-attachment", {
    policyArn: "arn:aws:iam::623865992637:policy/ECR_FullAccess",
    role: role.name,
});

const instanceProfile = new aws.iam.InstanceProfile("myInstanceProfile", {
    name: "myProfile",
    role: role.name,
});

const server = new aws.ec2.Instance("dev-server", {
    instanceType: "t3.micro",
    vpcSecurityGroupIds: [ devSG.id ], 
    ami: ubuntu.then(ubuntu => ubuntu.id),
    subnetId: publicSubnet.id,
    keyName: keyName,
    iamInstanceProfile: instanceProfile.name,
    userData: userData,
    tags: {
            Name: "dev-server",
        },
});

const publicIp = new aws.ssm.Parameter("server-public-ip", {
    name: "publicIP",
    type: "String",
    value: server.publicIp,
}); 



