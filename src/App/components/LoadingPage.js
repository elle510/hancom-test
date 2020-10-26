import React, { Component } from 'react';

class LoadingPage extends Component {
    render() {
        return (
            <div className="loader">
                <div className="loading-dot dot1" />
                <div className="loading-dot dot2" />
                <div className="loading-dot dot3" />
                <div className="loading-text">loading</div>
            </div>
        );
    }
}

export default LoadingPage;
