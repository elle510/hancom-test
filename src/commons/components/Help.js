import React, { Component } from 'react';

import {
    Help as PSHelp,
    translate,
} from 'polestar-ui-kit';

class Help extends Component {
    render() {
        const {
            title,
            content,
            ...rest
        } = this.props;

        return (
            <PSHelp
                // className="help"
                title={title || translate('도움말')}
                content={content}
                {...rest}
            />
        );
    }
}

export default Help;
