
export interface TabDefinition {
    name: string;
    path: string;
    default: boolean;
};

const home: TabDefinition = {
    name: 'Home',
    path: `/`,
    default: true,
};

const notification: TabDefinition = {
    name: 'Notifications',
    path: `/notifications`,
    default: false,
};
const apiClients: TabDefinition = {
    name: 'Clients',
    path: `/table`,
    default: false,
};
const organization: TabDefinition = {
    name: 'Organizations',
    path: `/users/userId/organizations`,
    default: false,
};
const linkages: TabDefinition = {
    name: 'Linkages',
    path: `/users/userId/linkages`,
    default: false,
};
const newsFeeds: TabDefinition = {
    name: 'Newsfeeds',
    path: `/users/userId/newsfeed`,
    default: false,
};
export const navbarMenu = () => {
    const menus = [
            home,
            apiClients,
            notification,
            organization,
            linkages,
            newsFeeds
    ];
    return replaceUserId(menus);
};

export const sidebarMenu = (userId) => {
    const menus = [
        notification,
        organization,

    ];
    return replaceUserId(menus);
};

const replaceUserId = (menus) => {
    return menus.map(x => {
        return {
            name: x.name,
            path: x.path.replace('userId'),
            default: x.default,
        };
    });
};
