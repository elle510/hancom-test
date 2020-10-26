import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withLoading } from 'polestar-ui-kit';

import { constAuth } from 'commons/helpers/authHelper';

const withRoutes = (WrappedComponent) => {
    return class extends React.Component {
        static propTypes = {
            auth: PropTypes.string.isRequired,
            // permission: PropTypes.string.isRequired,
        };

        isAuthenticated = () => {
            const {
                authorization,
                auth,
                // permission,
            } = this.props;
            // console.log('withRoutes isAuthenticated', authorization);
            return auth === constAuth.AUTH_NONE
            || (authorization && authorization[auth] && authorization[auth][constAuth.READ]);
        }

        render() {
            const {
                dispatch,
                authorization,
                auth,
                permission,
                ...rest
            } = this.props;

            return (
                <WrappedComponent
                    {...rest}
                    isAuthenticated={this.isAuthenticated()}
                />
            );
        }
    };
};

const mapStateToProps = ({ appInfo }) => ({
    authorization: appInfo.userInfo.authorization,
});

const composedWithRoutes = compose(
    connect(mapStateToProps),
    withLoading,
    withRoutes,
);

export default composedWithRoutes;
