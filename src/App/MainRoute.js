import React, { Component } from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Error404 from 'commons/views/errors/Error404';

import routes from '../routes';
import RouteWithSubRoutes from '../routes/RouteWithSubRoutes';
import Main from './Main';

class MainRoute extends Component {
    constructor(props) {
        super(props);

        this.routesResult = routes();
    }

    invalidPath = (_routes, path) => {
        return _routes.some((route) => {
            const matched = matchPath(path, {
                path: route.path,
                exact: true,
                strict: true,
            });
            if (matched) return true;

            if (route.routes) {
                const invalid = this.invalidPath(route.routes, path);
                if (invalid) {
                    return true;
                }
            }
            return false;
        });
    };

    renderRoute = () => {
        const { location } = this.props;

        if (location.pathname !== '/') {
            const invalid = this.invalidPath(
                this.routesResult,
                location.pathname,
            );

            // 페이지가 없는 경우(잘못된 URL)
            if (!invalid) {
                return <Error404 />;
            }
        }

        return this.routesResult.map((route) => (
            <RouteWithSubRoutes key={uuidv4()} {...route} />
        ));
    };

    render() {
        const {
            location: { pathname },
        } = this.props;
        return <Main pathname={pathname}>{this.renderRoute()}</Main>;
    }
}

export default withRouter(MainRoute);
