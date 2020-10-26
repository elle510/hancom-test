import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
    // static propTypes = {
    //     onMenuClick: PropTypes.func,
    // };

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         userInfoPopoverVisible: false,
    //     };
    // }

    render() {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <div className="ps-layout-navbar-logo">
                        <a href="http://youtube.com">YouTube</a>
                    </div>
                    {/* <div className="ps-layout-navbar-nav" />
                    <div className="ps-layout-navbar-item" /> */}
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
