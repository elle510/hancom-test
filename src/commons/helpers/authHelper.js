export const getAuthMenu = (menus, authorization) => {
    if (!authorization) return [];
    const authMenu = menus.filter((menu) => {
        if (!menu.children) {
            if (
                !menu.auth ||
                (menu.auth !== 'None' &&
                    (!authorization[menu.auth] ||
                        !authorization[menu.auth].readable))
            ) {
                return false;
            }
            return true;
        }
        const subMenu = getAuthMenu(menu.children, authorization);
        if (subMenu && subMenu.length > 0) {
            menu.children = subMenu;
            return true;
        }
        return false;
    });

    // console.log('authMenu', authMenu);
    return authMenu;
};

export const getAuthRoutes = (routes, authorization) => {
    if (!authorization) return [];
    const authRoute = routes.filter((route) => {
        if (!route.routes) {
            if (
                !route.auth ||
                (route.auth !== 'None' &&
                    (!authorization[route.auth] ||
                        !authorization[route.auth].readable))
            ) {
                return false;
            }
            return true;
        }
        const subRoute = getAuthMenu(route.routes, authorization);
        if (subRoute && subRoute.length > 0) {
            route.routes = subRoute;
            return true;
        }
        return false;
    });

    return authRoute;
};

export const constAuth = {
    READ: 'readable',
    WRITE: 'writable',
    DELETE: 'deletable',
    EXECUTE: 'executable',

    AUTH_NONE: 'None',
    AUTH_DASHBOARD: 'Dashboard',
    AUTH_WEBAPM: 'WebAPM',
    AUTH_BUSINESS: 'Business',
    AUTH_ANOMALY: 'Anomaly',
    AUTH_KCM: 'KCM',
    AUTH_LOGPRESSO: 'LogPresso',
    AUTH_AWS: 'AWS',
    AUTH_MONITORING: 'MONITORING',
};

export const test = () => {};
