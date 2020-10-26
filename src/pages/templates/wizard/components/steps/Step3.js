import React, { Component } from 'react';

import {
    // Form,
    Field,
    translate,
} from 'polestar-ui-kit';

// import {
//     NameInput,
// } from 'commons/components';

class Step3 extends Component {
    getFieldsValue = () => null;

    setFieldsValue = (stepValue) => {
        console.log('setFieldsValue stepValue', stepValue);
        // target 에 값 설정한다.
        // this.props.form.setFieldsValue(stepValue);
    };

    // resetFields = () => {
    //     this.props.form.resetFields();
    // }

    validateFields = (callback) => {
        // this.props.form.validateFields(callback);
        const values = { test: '123' }; // target values
        callback(false, values);
    };

    render() {
        // const {
        //     // form,
        //     // stepValue,
        //     // isUpdate,
        // } = this.props;

        return (
            <Field.TreeToGrid
                source={{
                    title: translate('인프라'),
                }}
                target={{
                    title: translate('선택된 인프라'),
                }}
            />
        );
    }
}

export default Step3;
