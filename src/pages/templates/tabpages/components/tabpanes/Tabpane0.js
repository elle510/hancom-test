import React, {
    // useState,
    // useEffect,
    useMemo,
    // useCallback,
    // useRef,
} from 'react';

import { translate } from 'polestar-ui-kit';

// import apis from 'apis';
import { Grid, SearchForm } from 'commons/components';

const Tabpane0 = () => {
    // 그리드 컬럼
    const gridColumns = useMemo(
        () => [
            {
                headerName: translate('로그 리소스명'),
                field: 'id',
                cellRenderer: 'linkRenderer',
                // cellRendererParams: {
                //     onClick: handleUpdatePage,
                // },
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
        [],
    );

    // 검색필드
    const searchColumns = useMemo(
        () => ({
            name: {
                label: translate('로그 리소스명'),
            },
            createDate: {
                label: translate('리소스 등록일자'),
            },
            moduleType: {
                label: translate('모듈타입'),
            },
            pattern: {
                label: translate('패턴'),
            },
        }),
        [],
    );

    return (
        <div className="page">
            <div className="page-header page-header-bordered">
                <SearchForm
                    schema={searchColumns}
                    // onSearch={handleSearch}
                    initFieldCount={2}
                />
            </div>
            <div className="page-content page-has-grid">
                <Grid
                    // ref={gridRef}
                    header={{
                        title: translate('로그 리소스 관리'),
                        // onAdd: handleAddPage,
                        // onRemove: handleRemove,
                        // onRefresh: handleRefresh,
                        // customButtons,
                    }}
                    request={{
                        url: 'https://jsonplaceholder.typicode.com/posts',
                        // url: '/api/users',
                        method: 'get',
                    }}
                    itemsKey={null}
                    columnDefs={gridColumns}
                    // exportColumns={exportColumns}
                    // exportFileName={translate('엑셀파일명')}
                    // exportSheetName={translate('시트명')}
                    // hideLoading={hideLoading}
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

export default Tabpane0;
