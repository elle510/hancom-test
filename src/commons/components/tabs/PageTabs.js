import React, {
    // useState,
    // useEffect,
    // useMemo,
    useCallback,
    // useRef,
    forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import storage from 'store/storages/sessionStorage';

import { Tabs } from 'polestar-ui-kit';

import { constStorage } from 'commons/constants';

const PageTabs = forwardRef((props, ref) => {
    const { type, className, children, onChange, ...rest } = props;

    // const innerRef = useRef(ref);

    const handleTabChange = useCallback(
        (key) => {
            storage.write(type, key);
        },
        [type],
    );

    return (
        <Tabs
            ref={ref}
            className={classNames('ps-tabs-card', className, 'ps-custom-tabs')}
            onChange={handleTabChange}
            {...rest}
        >
            {children}
        </Tabs>
    );
});

PageTabs.propTypes = {
    type: PropTypes.string,
};

PageTabs.defaultProps = {
    type: constStorage.EXTMS_TAB, // TODO 테스트 용 (추후 변경필요)
};

export default PageTabs;
