
import { error } from "@sveltejs/kit";
import chalk from 'chalk';

/////////////////////////////////////////////////////////////////////////

export const get_ = async ( url: string) => {
    const headers = {};
    headers['Content-Type'] = 'application/json';
    const res = await fetch(url, {
        method: 'GET',
        headers
    });
    const response = await res.json();
    if (response.Status === 'failure') {
        if (response.HttpCode === 404) {
            console.log(chalk.red(`get_ response message: 404 - ${response.Message}`));
            return null;
        }
        else if(response.HttpCode !== 200) {
            console.log(chalk.red(`get_ response message: ${response.Message}`));
            throw error(response.HttpCode, response.Message);
        }
    }
    console.log(chalk.green(`get_ response message: ${response.Message}`));
    return response.Data;
}

export const post_ = async ( url: string, bodyObj: unknown) => {

    const headers = {};
    headers['Content-Type'] = 'application/json';
    const body = JSON.stringify(bodyObj)
    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    if (response.Status === 'failure' ||
    (response.HttpCode !== 201 && response.HttpCode !== 200)) {
        console.log(chalk.red(`post_ response message: ${response.Message}`));
        throw error(response.HttpCode, response.Message);
    }
    console.log(chalk.green(`post_ response message: ${response.Message}`));
    return response.Data;
}

// export const put_ = async (sessionId: string, url: string, bodyObj: unknown) => {
//     const session = await SessionManager.getSession(sessionId);
//     const accessToken = session.accessToken;
//     const headers = {};
//     headers['Content-Type'] = 'application/json';
//     headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
//     headers['Authorization'] = `Bearer ${accessToken}`;
//     const body = JSON.stringify(bodyObj);
//     console.log(`body = ${body}`);
//     const res = await fetch(url, {
//         method: 'PUT',
//         body,
//         headers
//     });
//     const response = await res.json();
//     if (response.Status === 'failure' || (response.HttpCode !== 200 && response.HttpCode !== 201) ) {
//         console.log(chalk.red(`put_ response message: ${response.Message}`));
//         throw error(response.HttpCode, response.Message);
//     }
//     console.log(chalk.green(`put_ response message: ${response.Message}`));
//     return response.Data;
// }

// export const delete_ = async (sessionId: string, url: string) => {
//     const session = await SessionManager.getSession(sessionId);
//     const accessToken = session.accessToken;
//     //console.log(`accessToken = ${accessToken}`);
//     const headers = {};
//     headers['Content-Type'] = 'application/json';
//     headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
//     headers['Authorization'] = `Bearer ${accessToken}`;
//     const res = await fetch(url, {
//         method: 'DELETE',
//         headers
//     });
//     const response = await res.json();
//     console.log(response.Message);
//     if (response.Status === 'failure' || response.HttpCode !== 200) {
//         console.log(chalk.red(`delete_ response message: ${response.Message}`));
//         throw error(response.HttpCode, response.Message);
//     }
//     console.log(chalk.green(`delete_ response message: ${response.Message}`));
//     return response.Data;
// }
