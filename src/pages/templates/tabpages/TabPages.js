import React, {
    // useState,
    useEffect,
    useMemo,
    // useCallback,
    useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import storage from 'store/storages/sessionStorage';

import { Tabs, translate } from 'polestar-ui-kit';

import { PageTabs } from 'commons/components';
import { constStorage } from 'commons/constants';

import * as breadcrumbsActions from 'pages/home/node_modules/actions/breadcrumbs';

import Tabpane0 from './components/tabpanes/Tabpane0';
import Tabpane1 from './components/tabpanes/Tabpane1';
import Tabpane2 from './components/tabpanes/Tabpane2';

const TabPages = (props) => {
    const { breadcrumbRoutes } = props;

    const dispatch = useDispatch();

    const tabsRef = useRef();

    const selectedKey = useMemo(() => {
        return storage.read(constStorage.EXTMS_TAB);
    }, []);

    useEffect(() => {
        dispatch(breadcrumbsActions.setBreadcrumbs(breadcrumbRoutes));

        // tab 선택 확인
        const activeKey = tabsRef.current.getActiveKey();
        const existKey =
            tabsRef.current.findKey(selectedKey) || 'groupSummaryTab';
        if (activeKey !== existKey) {
            tabsRef.current.changeTab(existKey);
        }
    }, [breadcrumbRoutes, dispatch, selectedKey]);

    return (
        <PageTabs
            ref={tabsRef}
            type={constStorage.EXTMS_TAB}
            defaultActiveKey={selectedKey}
        >
            <Tabs.TabPane tab={translate('첫번째 탭')} key="groupSummaryTab">
                <Tabpane0 />
            </Tabs.TabPane>
            <Tabs.TabPane tab={translate('두번째 탭')} key="inventoryTab">
                <Tabpane1 />
            </Tabs.TabPane>
            <Tabs.TabPane tab={translate('세번째 탭')} key="alarmTab">
                <Tabpane2 />
            </Tabs.TabPane>
        </PageTabs>
    );
};

export default TabPages;
