import { Confirm, translate } from 'polestar-ui-kit';
import {
    getToken,
    setToken,
    clearToken,
    isValidateToken,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
} from 'commons/helpers/jwtHelper';

import request, { setHeaderToken } from './requestHelper';

const refreshToken = async (config) => {
    if (isValidateToken(REFRESH_TOKEN)) {
        const refreshKey = `Bearer ${getToken(REFRESH_TOKEN)}`;
        const accessToken = await request({
            method: 'POST',
            url: '/api/auth/token',
            headers: { Authorization: refreshKey },
        })
            .then((response) => {
                // console.log('refreshToken response.data', response.data);
                return response.data[ACCESS_TOKEN];
            })
            .catch(() => {
                clearToken();
                window.location.href = '/';
            });

        setToken(ACCESS_TOKEN, accessToken);
        const authKey = `Bearer ${accessToken}`;
        setHeaderToken(authKey);

        return request(config);
    }

    Confirm({
        title: translate('message.move_login_url'),
        content: translate('message.expired_token'),
        onOk: () => {
            clearToken();
            window.location.href = '/';
        },
    });
    return false;
};

export default refreshToken;
