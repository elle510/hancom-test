import React from 'react';
import PropTypes from 'prop-types';
import { Field, translate } from 'polestar-ui-kit';
import { StringUtil } from 'polestar-utils';

class NameInput extends React.Component {
    static displayName = 'NameInput';

    static propTypes = {
        wrappedComponentRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.object,
        ]),
    };

    static validator = (rule, value, callback) => {
        if (value && value.trim() === '') {
            callback(translate('uikit:message.validate_only_whitespace'));
        } else if (value && StringUtil.isMaxBytes(value, 30)) {
            callback(translate('uikit:message.max_bytes', { max: 30 }));
        } else {
            callback();
        }
    };

    render() {
        // console.log('NameInput this.props', this.props);
        const { placeholder, onFocus, ...rest } = this.props;
        return (
            <Field.Input
                placeholder={placeholder || translate('please_input_name')}
                {...rest}
            />
        );
    }
}

export default NameInput;
