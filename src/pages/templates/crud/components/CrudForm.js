import React, { Component } from 'react';

import { Form, Field, Button, translate } from 'polestar-ui-kit';

class CrudForm extends Component {
    setFieldsValue = (fields) => {
        this.props.form.setFieldsValue(fields);
    };

    validateFields = (callback) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                callback(err, {
                    ...values,
                });
            }
        });
    };

    resetFields = (fields) => {
        this.props.form.resetFields(fields);
    };

    handleSave = () => {
        this.props.onSave();
    };

    handleCancel = () => {
        this.props.onCancel();
    };

    render() {
        const { form } = this.props;

        return (
            <Form>
                <Form.Field
                    form={form}
                    label={translate('user_id')}
                    name="userID"
                    // value={user ? user.userID : null}
                    required
                    field={{
                        component: Field.IDInput,
                        options: {
                            placeholder: translate('input_id'),
                            // readOnly: !!user,
                        },
                    }}
                />
                <Form.Field
                    form={form}
                    label={translate('user_name')}
                    name="userName"
                    // value={user ? user.userName : null}
                    // maxBytes={200}
                    required
                    field={{
                        component: Field.Input,
                        options: {
                            placeholder: translate('please_input_name'),
                        },
                    }}
                />
                <Form.Field
                    form={form}
                    label={translate('description')}
                    name="description"
                    // value={user ? user.description : null}
                    field={{
                        component: Field.TextArea,
                        options: {
                            placeholder: translate('please_input_description'),
                            rows: 3,
                        },
                    }}
                />
                {/* {!isUpdate
                        ? (
                            <PasswordRegField
                                form={form}
                                label={translate('password')}
                                name="password"
                                value={user ? user.password : null}
                                placeholder={translate('input_password')}
                            />
                        )
                        : (
                            <Button
                                onClick={this.handleChangePasswordPopup}
                            >
                                {translate('change_password')}
                            </Button>
                        )} */}
                <Form.Field
                    form={form}
                    name="passwordExpired"
                    // value={user ? user.passwordExpired : false}
                    field={{
                        component: Field.Checkbox,
                        options: {
                            label: translate('change_password_next_login'),
                            // defaultChecked: user ? user.passwordExpired : false,
                        },
                    }}
                />
                <Form.Field
                    form={form}
                    name="blocked"
                    // value={user ? user.blocked : false}
                    field={{
                        component: Field.Checkbox,
                        options: {
                            label: translate('not_login'),
                            // defaultChecked: user ? user.blocked : false,
                        },
                    }}
                />
                <Form.Field
                    form={form}
                    label={translate('company')}
                    name="corporation"
                    // value={user ? user.corporation : null}
                    field={Field.Input}
                />
                <Form.Field
                    form={form}
                    label={translate('department')}
                    name="deptName"
                    // value={user ? user.deptName : null}
                    field={Field.Input}
                />
                <Form.Field
                    form={form}
                    label={translate('email_address')}
                    name="email"
                    // value={user ? user.email : null}
                    field={{
                        component: Field.EmailInput,
                        options: {
                            placeholder: translate('please_input_email'),
                        },
                    }}
                />
                <Form.Field
                    form={form}
                    label={translate('phone_number')}
                    name="mobilePhone"
                    // value={user ? user.mobilePhone : null}
                    field={Field.PhoneInput}
                />
                <Form.Field form={form} name="action" className="text-right">
                    <Button.Spacing spacing={0}>
                        <Button
                            icon="angle-left"
                            // tooltip={translate('취소')}
                            onClick={this.handleCancel}
                        >
                            {translate('cancel')}
                        </Button>
                        <Button
                            type="primary"
                            icon="save"
                            // tooltip={translate('저장')}
                            onClick={this.handleSave}
                        >
                            {translate('save')}
                        </Button>
                    </Button.Spacing>
                </Form.Field>
            </Form>
        );
    }
}

export default Form.Create(CrudForm);
