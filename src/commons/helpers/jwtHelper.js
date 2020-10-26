import storage from 'store/storages/localStorage';
import jwtDecode from 'jwt-decode';

const ACCESS_EXPIRATION = 'access_expiration';
const REFRESH_EXPIRATION = 'refresh_expiration';

const setExpiredTime = (tokenName, token) => {
    const payload = jwtDecode(token);
    const expTime = payload.exp * 1000;
    const prefix = tokenName.split('_')[0];
    storage.write(`${prefix}_expiration`, expTime);
};

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export const setToken = (tokenName, token) => {
    storage.write(tokenName, token);
    setExpiredTime(tokenName, token);
};

export const getToken = (tokenName) => {
    return storage.read(tokenName);
};

export const clearToken = () => {
    storage.remove(ACCESS_TOKEN);
    storage.remove(REFRESH_TOKEN);
    storage.remove(ACCESS_EXPIRATION);
    storage.remove(REFRESH_EXPIRATION);
};

export const isValidateToken = (tokenName) => {
    // const token = getToken(tokenName);
    // let payload;
    // if (token) {
    //     payload = jwtDecode(token);
    //     // console.log('payload', payload);
    //     // console.log('현재시간', new Date().valueOf());
    // }

    // return token && (payload.exp * 1000 > new Date().valueOf());
    const prefix = tokenName.split('_')[0];
    const expiration = storage.read(`${prefix}_expiration`);
    return expiration && expiration > new Date().valueOf();
};
