import React, {
    // useState,
    useEffect,
    // useMemo,
    // useCallback,
    // useRef,
} from 'react';
import { useDispatch } from 'react-redux';

import * as breadcrumbsActions from 'pages/home/node_modules/actions/breadcrumbs';

import TemplateWizard from './components/TemplateWizard';

const Wizard = (props) => {
    const { /* showLoading, hideLoading, */ breadcrumbRoutes } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(breadcrumbsActions.setBreadcrumbs(breadcrumbRoutes));
    }, []);

    return <TemplateWizard />;
};

export default Wizard;
