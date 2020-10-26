import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import { mergeDeep } from 'immutable';
import { Tree as PSTree } from 'polestar-ui-kit';

import { requestHelper } from 'commons/helpers';

class Tree extends Component {
    constructor(props) {
        super(props);

        this.treeRef = React.createRef();
    }

    /**
     * @public
     */
    getItems = () => {
        return this.treeRef.current.getItems();
    };

    /**
     * @public
     */
    setEnabledItems = (nodeItems) => {
        this.treeRef.current.setEnabledItems(nodeItems);
    };

    /**
     * @public
     */
    setDisabledItems = (nodeItems) => {
        this.treeRef.current.setDisabledItems(nodeItems);
    };

    /**
     * @public
     */
    setEnabledCheckbox = (nodeItems) => {
        this.treeRef.current.setEnabledCheckbox(nodeItems);
    };

    /**
     * @public
     */
    setDisabledCheckbox = (nodeItems) => {
        this.treeRef.current.setDisabledCheckbox(nodeItems);
    };

    /**
     * @public
     */
    refresh = () => {
        this.treeRef.current.refresh();
    };

    /**
     * 검색
     * @public
     */
    search = (params) => {
        this.treeRef.current.search(params);
    };

    /**
     * 검색 데이터 초기화
     * @public
     */
    resetSearch = () => {
        this.treeRef.current.resetSearch();
    };

    /**
     * Tree Node Expand
     * @public
     */
    expand = (expandedKeys) => {
        this.treeRef.current.expand(expandedKeys);
    };

    /**
     * Tree Node Collapse All
     * @public
     */
    collapseAll = () => {
        this.treeRef.current.collapseAll();
    };

    /**
     * request object
     * @private
     */
    requestObject = (nodeItem, searchItem) => {
        const { params } = this.props.request;

        let _params = params || {};

        if (typeof params === 'function') {
            _params = params(nodeItem) || {};
        }

        return requestHelper({
            ...this.props.request,
            params: {
                ...nodeItem,
                params: {
                    ..._params,
                    ...searchItem,
                },
            },
        }).then((response) => {
            // console.log('response::', response);
            return response;
        });
    };

    render() {
        return (
            <PSTree
                ref={this.treeRef}
                {...this.props}
                // tree line, icon 삭제 -유리
                // showPlus
                // showLine

                // request={!this.props.items ? this.requestObject : null}
                request={this.props.request ? this.requestObject : null}
            />
        );
    }
}

export default Tree;
