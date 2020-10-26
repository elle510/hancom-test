import * as configApi from './config.api';

const testApi = {
    test: (dto) => {
        return new Promise((resolve) => {
            resolve({ test: 'test', ...dto });
        });
    },
};

const apis = { configApi, testApi };
export { apis as default, configApi };
