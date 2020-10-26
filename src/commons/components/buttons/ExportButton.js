import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Alert, translate } from 'polestar-ui-kit';

import { requestHelper } from 'commons/helpers';
// import { getFile } from 'services/dictionary/configDictionaryService';
import { saveAs } from 'file-saver';

class ExportButton extends Component {
    static propTypes = {
        url: PropTypes.string,
        extensions: PropTypes.array,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        onComplete: PropTypes.func,
    };

    static defaultProps = {
        extensions: ['.csv', '.xml'],
    };

    constructor(props) {
        super(props);

        this.state = {};

        this.exportItems = [];
    }

    setItems = (data) => {
        this.exportItems = data;
    };

    extractFileName = (contentDispositionValue) => {
        let filename = '';
        if (
            contentDispositionValue &&
            contentDispositionValue.indexOf('attachment') !== -1
        ) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDispositionValue);
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }
        return filename;
    };

    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
        const exportIDs = [];
        this.handleDownloadFile(exportIDs);
    };

    handleDownloadFile = (exportIDs) => {
        const { url } = this.props;
        console.log('handleDownloadFile', exportIDs);
        requestHelper({
            url,
            method: requestHelper.method.post(),
            params: { exportIDs },
        }).then((response) => {
            console.log('response', response.data);
            if (response.data.success === true) {
                window.location.href = response.data.data;
                const blob = new Blob([`filePath: ${response.data.data}`], {
                    type: 'application/xml;charset=utf-8',
                });
                setTimeout(() => {
                    saveAs(blob, 'test.xml');
                }, 100);
                if (this.props.onComplete) {
                    this.props.onComplete();
                }
            } else {
                // Alert.error(response.data.error.resourceKey);
                Alert.error(translate('failed_to_export'));
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
            <Button
                icon="upload"
                onClick={this.handleClick}
                disabled={disabled}
                {...others}
            >
                {/* <DownloadLink
                    filename="forbiddenCommand_Export.xml"
                    exportFile={() => Promise.resolve(this.state.data)}
                    target="_blank"
                    onChange={this.handleDownloadFile}
                /> */}
                {translate('export')}
            </Button>
            // <React.Fragment>
            //     <input
            //         type="file"
            //         accept={extensions.toString()}
            //         onChange={this.handleDownloadFile}
            //         style={{ display: 'none' }}
            //         data-id={this.uuid}
            //         disabled={disabled}
            //     />
            //     <Button
            //         icon="arrow-up"
            //         onClick={this.handleClick}
            //         disabled={disabled}
            //         {...others}
            //     >
            //         {translate('export')}
            //     </Button>
            // </React.Fragment>
        );
    }
}

export default ExportButton;
