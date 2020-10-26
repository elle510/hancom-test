import React, { Component } from 'react';

import { Form, Field, translate } from 'polestar-ui-kit';

import { NameInput, Help } from 'commons/components';

class Step0 extends Component {
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

    render() {
        const {
            form,
            // stepValue,
            // isUpdate,
        } = this.props;

        return (
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
                    required
                    // value={isUpdate ? name : stepValue && stepValue.name}
                    field={{
                        component: NameInput,
                        options: {
                            placeholder: translate(
                                '로그 리소스 이름을 입력하세요.',
                            ),
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
                    required
                    // value={isUpdate ? name : stepValue && stepValue.name}
                    field={{
                        component: Field.Input,
                        options: {
                            placeholder: translate('연계키를 입력하세요.'),
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
                    required
                    value="tomcat"
                    field={{
                        component: Field.Select,
                        options: {
                            items: [
                                { label: 'Tomcat', value: 'tomcat' },
                                { label: 'Kafka', value: 'kafka' },
                                { label: 'MySQL', value: 'mysql' },
                            ],
                        },
                    }}
                />
            </Form>
        );
    }
}

export default Form.Create(Step0);
