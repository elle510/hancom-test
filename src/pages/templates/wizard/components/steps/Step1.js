import React, { Component } from 'react';

import { Form, Field, translate } from 'polestar-ui-kit';

import { Grid, Help } from 'commons/components';

class Step1 extends Component {
    getFieldsValue = () => this.props.form.getFieldsValue();

    setFieldsValue = (stepValue) => {
        console.log('setFieldsValue stepValue', stepValue);
        this.props.form.setFieldsValue(stepValue);
    };

    resetFields = () => {
        this.props.form.resetFields();
    };

    validateFields = (callback) => {
        this.props.form.validateFields(callback);
    };

    gridColumns = () => [
        {
            headerName: translate('연계키'),
            field: 'key',
            // width: 300,
        },
        {
            headerName: translate('로그 파일명'),
            field: 'logFileName',
            // width: 150,
        },
        {
            headerName: translate('로그 파일 경로'),
            field: 'logFilePath',
            // width: 150,
        },
        // {
        //     headerName: translate('apply'),
        //     field: 'audit',
        //     width: 100,
        //     cellRenderer: 'checkboxRenderer',
        //     cellRendererParams: {
        //         readOnly: false,
        //         onChange: (checked, rowItem) => {
        //             console.log('checkboxRenderer onChange checked', checked);
        //             console.log('checkboxRenderer onChange rowItem', rowItem);
        //             rowItem.audit = checked;
        //         },
        //     },
        // },
    ];

    render() {
        const {
            form,
            // stepValue,
            // isUpdate,
        } = this.props;

        return (
            <div className="page">
                <div className="page-header">
                    <Form className="wizard-form">
                        <Form.Field
                            form={form}
                            label={
                                <span>
                                    패턴 {/* {this.labels.name} */}
                                    <Help content={<div>도움말 설명</div>} />
                                </span>
                            }
                            name="logPattern"
                            required
                            // value={isUpdate ? name : stepValue && stepValue.name}
                            field={{
                                component: Field.Input,
                                options: {
                                    placeholder: translate(
                                        '로그 패턴을 입력하세요.',
                                    ),
                                },
                            }}
                        />
                    </Form>
                </div>
                <div
                    className="page-content page-has-grid"
                    style={{ height: 'calc(100vh - 285px)' }}
                >
                    <Grid
                        ref={this.gridRef}
                        columnDefs={this.gridColumns()}
                        pageable={false}
                        // onGridReady={this.handleGridReady}
                    />
                </div>
            </div>
        );
    }
}

export default Form.Create(Step1);
