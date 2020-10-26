import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'polestar-ui-kit';

import { routeHelper } from 'commons/helpers';

const RouterBackButton = (props) => {
    const { pathname } = props;

    const history = useHistory();

    return (
        <Button
            key="exit"
            icon="exit"
            onClick={() => {
                if (pathname) {
                    routeHelper.moveLink(history, pathname);
                } else {
                    history.goBack();
                }
            }}
        />
    );
};

export default RouterBackButton;
