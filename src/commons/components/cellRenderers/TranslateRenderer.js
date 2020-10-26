import React, { Component } from 'react';

import { translate } from 'polestar-ui-kit';

class TranslateRenderer extends Component {
    translateText = () => {
        const { value } = this.props;
        return translate(value);
    }

    render() {
        return (
            <span className="grid-renderer">
                {this.translateText()}
            </span>
        );
    }
}

export default TranslateRenderer;
