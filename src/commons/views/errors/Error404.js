import React from 'react';

class Error404 extends React.Component {
    render() {
        return (
            <div
                style={{
                    textAlign: 'center',
                    color: '#5e5e5e',
                    fontSize: '25px',
                    fontWeight: '500',
                }}
            >
                <br />
                <h1>
                    <b> Error</b>
                </h1>
                <br />

                <p>알 수 없는 페이지 </p>
                <p>다시 시도해 주세요. </p>
            </div>
        );
    }
}

export default Error404;
