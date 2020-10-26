import React, {
    // useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, Confirm, translate } from 'polestar-ui-kit';

import apis from 'apis';
import { Grid, SearchForm, Alert } from 'commons/components';
import { routeHelper, dateHelper } from 'commons/helpers';
import { useConstructor } from 'commons/hooks';

import * as breadcrumbsActions from 'pages/home/node_modules/actions/breadcrumbs';

const Crud = (props) => {
    const { showLoading, hideLoading, breadcrumbRoutes } = props;

    const dispatch = useDispatch();
    const history = useHistory();

    const gridRef = useRef(null);

    useConstructor(() => {
        showLoading();
    });

    useEffect(() => {
        dispatch(breadcrumbsActions.setBreadcrumbs(breadcrumbRoutes));
    }, []);

    // 검색버튼 클릭
    const handleSearch = useCallback(
        (e, data) => {
            const values = data;
            console.log('handleSearch data', data);

            showLoading();
            gridRef.current.search(values);
        },
        [showLoading],
    );

    // 등록화면 이동
    const handleAddPage = useCallback(() => {
        const pathname = '/crud/add';
        routeHelper.moveLink(history, pathname);
    }, [history]);

    // 수정화면 이동
    const handleUpdatePage = useCallback(
        (node) => {
            // console.log('handleUpdatePage node', node);
            // history.push(`/user/${node.data.id}`);
            const pathname = `/crud/${node.data.id}`;
            routeHelper.moveLink(history, pathname);
        },
        [history],
    );

    // 삭제
    const remove = useCallback((items) => {
        if (!items) return;
        const ids = [];
        items.forEach((item) => {
            ids.push(item.id);
        });

        Confirm({
            title: translate('삭제'),
            content: translate('do_you_want_to_delete'),
            onOk: () => {
                showLoading();
                apis.testApi.test(items).then(() => {
                    hideLoading();
                    gridRef.current.refresh();
                    Alert.success(translate('has_been_deleted'));
                });
            },
        });
    }, []);

    // 삭제버튼 클릭
    const handleRemove = useCallback(() => {
        console.log('handleRemove');
        const selectedItems = gridRef.current.api.getSelectedRows();
        if (selectedItems && selectedItems.length > 0) {
            remove(selectedItems);
        } else {
            Alert.error(translate('select_item'));
        }
    }, []);

    // 사용자 목록 새로고침
    const handleRefresh = useCallback(() => {
        console.log('handleRefresh');
        showLoading();

        // 그리드 refresh
        gridRef.current.refresh();
    }, []);

    // 그리드 컬럼
    const gridColumns = useMemo(
        () => [
            {
                headerName: translate('로그 리소스명'),
                field: 'id',
                cellRenderer: 'linkRenderer',
                cellRendererParams: {
                    onClick: handleUpdatePage,
                },
                width: 150,
            },
            {
                headerName: translate('리소스 등록일자'),
                field: 'userId',
                width: 200,
                // cellRendererFramework: (params) => {
                //     return (
                //         <span>{params.data.userName != null ? <Icon name="user" /> : ''} {params.data.userName}</span>
                //     );
                // },
            },
            {
                headerName: translate('모듈타입'),
                field: 'title',
                width: 100,
            },
            {
                headerName: translate('패턴'),
                field: 'body',
                width: 100,
            },
        ],
        [handleUpdatePage],
    );

    const exportColumns = useMemo(() => {
        return gridColumns.map((col) => {
            const isExport = true;
            let exportValue;
            if (col.field === 'agentless') {
                exportValue = (value) => {
                    return value || false;
                };
            } else if (col.field === 'createdDate') {
                exportValue = (value) => {
                    return dateHelper.getDateString(value, true);
                };
            } else if (col.field === 'modifiedDate') {
                exportValue = (value) => {
                    return dateHelper.getDateString(value, true);
                };
            }

            return {
                headerName: col.headerName,
                field: col.field,
                isExport,
                exportValue,
            };
        });
    }, [gridColumns]);

    // 검색필드
    const searchColumns = useMemo(
        () => ({
            name: {
                label: translate('로그 리소스명'),
            },
            createDate: {
                label: translate('리소스 등록일자'),
            },
            fieldName4: {
                label: '선택 검색',
                value: 'gyeunggi',
                component: {
                    type: 'select',
                    options: {
                        placeholder: '검색어를 선택하세요.',
                        items: [
                            {
                                label: '서울',
                                value: 'seoul',
                            },
                            {
                                label: '대전',
                                value: 'daejeon',
                                disabled: true,
                            },
                            {
                                label: '경기',
                                value: 'gyeunggi',
                            },
                        ],
                    },
                },
            },
            fieldName6: {
                label: '날짜 검색',
                component: {
                    type: 'daterangepicker',
                    options: {
                        // width: 270,
                    },
                },
            },
        }),
        [],
    );

    // 커스텀 버튼
    const customButtons = useMemo(() => [<Button>Custom</Button>], []);

    return (
        <div className="page">
            <div className="page-header page-header-bordered">
                <SearchForm
                    schema={searchColumns}
                    onSearch={handleSearch}
                    initFieldCount={2}
                />
            </div>
            <div className="page-content page-has-grid">
                <Grid
                    ref={gridRef}
                    header={{
                        title: translate('로그 리소스 관리'),
                        onAdd: handleAddPage,
                        onRemove: handleRemove,
                        onRefresh: handleRefresh,
                        customButtons,
                    }}
                    request={{
                        url: 'https://jsonplaceholder.typicode.com/posts',
                        // url: '/api/users',
                        method: 'get',
                    }}
                    itemsKey={null}
                    columnDefs={gridColumns}
                    exportColumns={exportColumns}
                    exportFileName={translate('엑셀파일명')}
                    exportSheetName={translate('시트명')}
                    hideLoading={hideLoading}
                    // height={500}
                    pageable={false}
                    checkable
                    // isRowSelectable={(node) => {
                    //     return node.data ? node.data.userID !== constCommon.ADMIN : false;
                    // }}
                />
            </div>
        </div>
    );
};

export default Crud;
