import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid as PSGrid } from 'polestar-ui-kit';

import { requestHelper, excelHelper } from 'commons/helpers';

import DateRenderer from './cellRenderers/DateRenderer';
import TranslateRenderer from './cellRenderers/TranslateRenderer';

// filters

class Grid extends Component {
    static propTypes = {
        exportColumns: PropTypes.array,
        exportFileName: PropTypes.string,
        exportSheetName: PropTypes.string,
        isXlsx: PropTypes.bool,
    };

    static defaultProps = {
        isXlsx: true,
    };

    constructor(props) {
        super(props);

        const {
            // columnDefs,
            frameworkComponents,
        } = props;

        // this.columnDefs = this.makeColumnDefs(columnDefs);

        this.gridRef = React.createRef();

        this.frameworkComponents = {
            dateRenderer: DateRenderer,
            translateRenderer: TranslateRenderer,

            // filters

            ...frameworkComponents,
        };
    }

    onGridReady = (params) => {
        this.api = params.api;
        this.columnApi = params.columnApi;

        if (this.props.onGridReady) {
            this.props.onGridReady(params);
        }
    };

    getApi = () => this.api;

    getColumnApi = () => this.columnApi;

    /**
     * Grid Row 선택한 Items
     * @public
     */
    getSelectedItems = () => this.gridRef.current.selectedItems;

    /**
     * Grid Row 선택한 개수
     * @public
     */
    getSelectedItemCount = () => this.gridRef.current.selectedItemCount;

    /**
     * Grid 데이터 리턴 (pageable = false 인 경우)
     * @public
     */
    getItems = () => {
        const items = [];
        this.api.forEachNode((rowNode) => {
            items.push(rowNode.data);
        });
        return items;
    };

    /**
     * Grid display 데이터 리턴 (pageable = false 인 경우)
     * @public
     */
    getDisplayedItems = () => {
        const displayedItems = [];
        this.api.forEachNodeAfterFilterAndSort((rowNode) => {
            displayedItems.push(rowNode.data);
        });
        return displayedItems;
    };

    /**
     * 검색조건 리턴
     * @public
     */
    getSearchData = () => this.gridRef.current.getSearchData();

    // 정렬 리턴 (targetFields와 descs 는 , 로 구분된 String)
    getOrders = () => [this.targetFields, this.descs];

    /**
     * 검색
     * @public
     */
    search = (data) => {
        this.gridRef.current.search(data);
    };

    /**
     * 검색 데이터 초기화
     * @public
     */
    resetSearch = () => {
        this.gridRef.current.resetSearch();
    };

    /**
     * 새로고침
     * @public
     */
    refresh = () => {
        this.gridRef.current.refresh();
    };

    /**
     * grid 컬럼
     * @private
     */
    // makeColumnDefs = (columnDefs) => {
    //     const columns = columnDefs.slice();
    //     columns.forEach((column) => {
    //         column.menuTabs = ['columnsMenuTab'];
    //         if (this.props.filterable) {
    //             column.menuTabs.unshift('filterMenuTab');
    //         }
    //     });

    //     return columns;
    // }

    /**
     * export excel
     * @private
     */
    handleExcel = () => {
        const {
            pageable,
            exportColumns,
            exportFileName,
            exportSheetName,
            header,
            isXlsx,
        } = this.props;

        if (pageable === false) {
            const items = this.getDisplayedItems();
            excelHelper.exportExcel(
                items,
                exportColumns,
                exportFileName || header.title,
                exportSheetName,
                isXlsx,
            );
        } else {
            requestHelper({
                ...this.props.request,
                params: {
                    // ...excelHelper.exportGridParams,
                    ...this.params,
                    rowIndex: 0,
                    pageSize: 2147483647, // 서비스에서 설정한 기본 Max 값
                },
            }).then((response) => {
                const items = response.data.data;

                excelHelper.exportExcel(
                    items,
                    exportColumns,
                    exportFileName || header.title,
                    exportSheetName,
                    isXlsx,
                );
            });
        }
    };

    /**
     * request object
     * @private
     */
    requestObject = ({ pageInfo, searchData }) => {
        const { params } = this.props.request;

        let _pageInfo = pageInfo;
        if (this.props.pageable === false) {
            _pageInfo = {};
        } else {
            const targetFields = [];
            const descs = [];
            _pageInfo.orders.forEach((model) => {
                targetFields.push(model.targetField);
                descs.push(model.desc);
            });
            _pageInfo = {
                rowIndex: _pageInfo.rowIndex,
                pageSize: _pageInfo.pageSize,
                targetFields,
                descs,
            };
        }

        let _params = params || {};
        if (typeof params === 'function') {
            _params = params(_pageInfo) || {};
        }

        this.params = {
            ..._pageInfo,
            ..._params,
            ...searchData,
        };

        return requestHelper({
            ...this.props.request,
            params: this.params,
        })
            .then((response) => {
                if (this.props.hideLoading) {
                    this.props.hideLoading();
                }
                console.log('Grid response', response);
                return response;
            })
            .catch(() => {
                if (this.props.hideLoading) {
                    this.props.hideLoading();
                }
            });
    };

    renderHeader = () => {
        const { header, exportColumns } = this.props;
        if (header || exportColumns) {
            return {
                ...header,
                onExcel: exportColumns ? this.handleExcel : null,
            };
        }
        return null;
    };

    render() {
        const {
            columnDefs,
            exportColumns,
            header,
            pageable,
            // suppressLoadingOverlay,
            frameworkComponents,
            ...rest
        } = this.props;

        return (
            <PSGrid
                ref={this.gridRef}
                header={this.renderHeader()}
                columnDefs={columnDefs}
                pageable={typeof pageable === 'undefined' || pageable}
                filterable={!(typeof pageable === 'undefined' || pageable)}
                // suppressLoadingOverlay={typeof suppressLoadingOverlay === 'undefined' || suppressLoadingOverlay}
                frameworkComponents={this.frameworkComponents}
                {...rest}
                // request={!this.props.items ? this.requestObject : null}
                request={this.props.request ? this.requestObject : null}
                onGridReady={this.onGridReady}
            />
        );
    }
}

export default Grid;
