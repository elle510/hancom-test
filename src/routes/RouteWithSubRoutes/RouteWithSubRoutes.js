import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = (route) => {
    // console.log('RouteWithSubRoutes', route);
    const { path, exact, component, routes, ...rest } = route;
    return (
        <Route
            path={path}
            exact={typeof exact === 'boolean' ? exact : true}
            render={(props) => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} {...rest} routes={routes} />
            )}
        />
    );
};

export default RouteWithSubRoutes;
