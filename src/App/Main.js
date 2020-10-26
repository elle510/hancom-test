import React, { Component } from 'react';
import classNames from 'classnames';

import Header from './components/Header/Header';

class Main extends Component {
    render() {
        const { children } = this.props;
        return (
            <div className={classNames('ps-layout-wrapper')}>
                <Header />
                <div className="ps-layout-container">
                    <div className="ps-layout-main">
                        <div className="ps-layout-content">{children}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
