import requestHelper from 'commons/helpers/requestHelper';
import {
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    setToken,
} from 'commons/helpers/jwtHelper';

export const authority = () => {
    return requestHelper({
        method: 'POST',
        url: '/rest/analysis/common/authority',
    }).then((response) => {
        setToken(ACCESS_TOKEN, response.data[ACCESS_TOKEN]);
        setToken(REFRESH_TOKEN, response.data[REFRESH_TOKEN]);
        return response.data;
    });
};

export const initConfig = () => {
    return requestHelper({
        method: 'POST',
        url: '/rest/extms/app/config',
    }).then((response) => {
        return response.data;
    });
};

export const loadResource = (locale) => {
    return requestHelper({
        method: 'POST',
        url: '/rest/extms/app/locale',
        params: {
            locale,
        },
    }).then((response) => {
        return response.data;
    });
};

export const user = () => {
    return requestHelper({
        method: 'POST',
        url: '/rest/extms/app/user',
    }).then((response) => {
        return response.data;
    });
};
