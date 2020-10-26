import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import { hot } from 'react-hot-loader/root';

// import { configApi /* , authService */ } from 'apis';

import MainRoute from './MainRoute';

class App extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {}

    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/list" />}
                    />
                    <MainRoute />
                </Switch>
            </Router>
        );
    }
}

export default hot(App);
