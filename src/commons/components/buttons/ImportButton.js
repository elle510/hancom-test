import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Button, Alert, translate } from 'polestar-ui-kit';

import { requestHelper } from 'commons/helpers';

class ImportButton extends Component {
    static propTypes = {
        resourceId: PropTypes.string,
        url: PropTypes.string,
        extensions: PropTypes.array,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        onComplete: PropTypes.func,
    };

    static defaultProps = {
        extensions: ['.csv'],
    };

    constructor(props) {
        super(props);

        this.uuid = uuid();
    }

    handleClick = () => {
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        const fileDOM = document.querySelector(
            `input[type="file"][data-id="${this.uuid}"]`,
        );
        const cancelled = !fileDOM.dispatchEvent(event);
        if (cancelled) {
            // 만약 이벤트에 실패했다면
            throw new Error('Error input[type="file"] dispatch click event');
        }
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    handleOpenFile = (e) => {
        const { url, resourceId } = this.props;
        const input = e.target;
        const formData = new FormData();
        formData.append('importFile', input.files[0]);
        if (resourceId) {
            formData.append('resourceId', resourceId);
        }
        const params = formData;
        requestHelper.post(url, params).then((response) => {
            if (response.data.success === true) {
                if (this.props.onComplete) {
                    this.props.onComplete();
                }
            } else {
                Alert.success(translate('message.fail'));
            }
        });
    };

    render() {
        const {
            url,
            extensions,
            disabled,
            onClick,
            onComplete,
            ...others
        } = this.props;

        return (
            <React.Fragment>
                <input
                    type="file"
                    accept={extensions.toString()}
                    onChange={this.handleOpenFile}
                    style={{ display: 'none' }}
                    data-id={this.uuid}
                    disabled={disabled}
                    value=""
                />
                <Button
                    icon="download"
                    onClick={this.handleClick}
                    disabled={disabled}
                    {...others}
                >
                    {translate('import')}
                </Button>
            </React.Fragment>
        );
    }
}

export default ImportButton;
