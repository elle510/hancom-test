import React, {
    // useState,
    useEffect,
    // useMemo,
    useCallback,
    useRef,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { translate } from 'polestar-ui-kit';

import apis from 'apis';
import { Alert } from 'commons/components';
import { routeHelper } from 'commons/helpers';
import * as breadcrumbsActions from 'pages/home/node_modules/actions/breadcrumbs';

import CrudForm from './components/CrudForm';

const CrudFormContainer = (props) => {
    const { showLoading, hideLoading, breadcrumbRoutes } = props;

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const formRef = useRef(null);

    const getFormData = (_id) => {
        // TODO Form 데이터 api 호출 후 setFieldsValue
        apis.testApi
            .test({ testGetId: _id })
            .then((response) => {
                console.log('crud getFormData response', response);
                formRef.current.setFieldsValue(response);
            })
            .catch(() => {
                Alert.error(translate('에러 발생'));
            });
    };

    useEffect(() => {
        let routeLabel = '';
        if (id === 'add') {
            routeLabel = translate('사용자 등록');
        } else {
            routeLabel = translate('사용자 수정');
            // TODO GET 폼 데이터
            getFormData(id);
        }
        dispatch(
            breadcrumbsActions.setBreadcrumbs(breadcrumbRoutes, routeLabel),
        );
    }, []);

    const goBack = useCallback(() => {
        const pathname = '/crud';
        routeHelper.moveLink(history, pathname);
    }, [history]);

    const save = useCallback(() => {
        formRef.current.validateFields((err, values) => {
            if (!err) {
                const dto = {
                    custom1: 'custom1',
                    ...values,
                };
                showLoading();
                // TODO REST API 호출
                apis.testApi
                    .test(dto)
                    .then((response) => {
                        console.log('crud save response', response);
                        hideLoading();
                        Alert.success(translate('have_been_saved'));
                        goBack();
                    })
                    .catch(() => {
                        hideLoading();
                        Alert.error(translate('에러 발생'));
                    });
            }
        });
    }, [goBack, hideLoading, showLoading]);

    const cancel = () => {
        // history.goBack();
        goBack();
    };

    return (
        <div className="page">
            <div className="page-content">
                <CrudForm
                    wrappedComponentRef={formRef}
                    onSave={save}
                    onCancel={cancel}
                />
                {/* <div>
                    <Button.Spacing spacing={0}>
                        <Button
                            icon="angle-left"
                            // tooltip={translate('취소')}
                            onClick={cancel}
                        >
                            {translate('cancel')}
                        </Button>
                        <Button
                            type="primary"
                            icon="save"
                            // tooltip={translate('저장')}
                            onClick={save}
                        >
                            {translate('save')}
                        </Button>
                    </Button.Spacing>
                </div> */}
            </div>
        </div>
    );
};

export default CrudFormContainer;
