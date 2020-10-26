import axios from 'axios';
// import {
//     isValidateToken,
//     ACCESS_TOKEN,
// } from 'commons/helpers/jwtHelper';

// import refreshToken from './refreshToken';
// import checkExceptionUrl from './checkExceptionUrl';

axios.defaults.baseURL = '/';

const requestHelper = (config) => {
    // if (!isValidateToken(ACCESS_TOKEN) &&
    //     !checkExceptionUrl(config.url)) {
    //     return refreshToken(config);
    // }

    const {
        url,
        method = 'POST',
        headers,
        params,
        data, // data 는 사용 못하게 하기 위해
        ...others
    } = config;

    let reqParams = { data: params };
    if (method.toLowerCase() === 'get') {
        reqParams = { params };
    }

    return axios({
        url,
        method,
        headers: { ...headers },
        ...reqParams,
        ...others,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            if (error.response.status === 401) {
                window.location.href = error.response.data;
                return '';
            }
            console.error('request error', error);
            console.error('request error.response', error.response);
            throw new Error(error);
        });
};

export const setMethod = (standard = true) => {
    axios.defaults.POST = 'POST';
    axios.defaults.GET = 'GET';
    axios.defaults.PUT = standard ? 'PUT' : 'POST';
    axios.defaults.DELETE = standard ? 'DELETE' : 'POST';
};

export const setHeaderToken = (AUTH_TOKEN) => {
    // console.log('setHeaderToken', AUTH_TOKEN);
    axios.defaults.headers.common.Authorization = AUTH_TOKEN;
};

export const getHeaderToken = () => {
    return axios.defaults.headers.common.Authorization;
};

export const requestMethod = {
    get: () => axios.defaults.GET,
    post: () => axios.defaults.POST,
    put: () => axios.defaults.PUT,
    delete: () => axios.defaults.DELETE,
};

export const call = {
    get: (url, params, headers) =>
        requestHelper({
            url,
            method: requestMethod.get(),
            headers,
            params,
        }),
    post: (url, params, headers) =>
        requestHelper({
            url,
            method: requestMethod.post(),
            headers,
            params,
        }),
    put: (url, params, headers) =>
        requestHelper({
            url,
            method: requestMethod.put(),
            headers,
            params,
        }),
    delete: (url, params, headers) =>
        requestHelper({
            url,
            method: requestMethod.delete(),
            headers,
            params,
        }),
};

export default requestHelper;
