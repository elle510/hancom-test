import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Form, Field, translate } from 'polestar-ui-kit';

import { Grid, NameInput, Help } from 'commons/components';

// @inject((stores) => ({ wizardStore: stores.wizardStore }))
@inject((stores) => {
    console.log('@inject stores', stores);
    return { wizardStore: stores.wizardStore };
})
@observer
class Step2 extends Component {
    componentDidMount() {
        console.log(
            'componentDidMount wizardStore.values[2]',
            // this.props.wizardStore.values[2],
            this.props.wizardStore,
        );
    }

    componentDidUpdate() {
        console.log(
            'componentDidUpdate wizardStore.values[2]',
            // this.props.wizardStore.values[2],
            this.props.wizardStore,
        );
    }

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
                                    로그 리소스 이름 {/* {this.labels.name} */}
                                    <Help content={<div>도움말 설명</div>} />
                                </span>
                            }
                            name="logResourceName"
                            // required
                            // value={isUpdate ? name : stepValue && stepValue.name}
                            field={{
                                component: NameInput,
                                options: {
                                    placeholder: translate(
                                        '로그 리소스 이름을 입력하세요.',
                                    ),
                                    readOnly: true,
                                },
                            }}
                        />
                        <Form.Field
                            form={form}
                            label={
                                <span>
                                    연계키 {/* {this.labels.name} */}
                                    <Help content={<div>도움말 설명</div>} />
                                </span>
                            }
                            name="logResourceKey"
                            // required
                            // value={isUpdate ? name : stepValue && stepValue.name}
                            field={{
                                component: Field.Input,
                                options: {
                                    placeholder: translate(
                                        '연계키를 입력하세요.',
                                    ),
                                    readOnly: true,
                                },
                            }}
                        />
                        <Form.Field
                            form={form}
                            label={
                                <span>
                                    모듈타입 {/* {this.labels.name} */}
                                    <Help content={<div>도움말 설명</div>} />
                                </span>
                            }
                            name="moduleType"
                            // required
                            value="tomcat"
                            field={{
                                component: Field.Input,
                                options: {
                                    placeholder: translate(
                                        '연계키를 입력하세요.',
                                    ),
                                    readOnly: true,
                                },
                            }}
                        />
                        <Form.Field
                            form={form}
                            label={
                                <span>
                                    패턴 {/* {this.labels.name} */}
                                    <Help content={<div>도움말 설명</div>} />
                                </span>
                            }
                            name="logPattern"
                            // required
                            // value={isUpdate ? name : stepValue && stepValue.name}
                            field={{
                                component: Field.Input,
                                options: {
                                    placeholder: translate(
                                        '로그 패턴을 입력하세요.',
                                    ),
                                    readOnly: true,
                                },
                            }}
                        />
                    </Form>
                </div>
                <div
                    className="page-content page-has-grid"
                    style={{ height: 'calc(100vh - 501px)' }}
                >
                    <Grid
                        ref={this.gridRef}
                        header={{
                            title: translate('로그 파일 목록'),
                        }}
                        columnDefs={this.gridColumns()}
                        pageable={false}
                        // onGridReady={this.handleGridReady}
                    />
                </div>
            </div>
        );
    }
}

export default Form.Create(Step2);
