const urls = [
    // './config.json',
    '/api/anon/config',
    // './locales/locale-ko.json',
    '/api/anon/locale',
    '/api/auth/login',
    '/api/auth/token',
];

const checkExceptionUrl = (checkUrl) => {
    let isUrl = false;
    urls.forEach(url => {
        if (url === checkUrl) {
            isUrl = true;
        }
    });
    return isUrl;
};

export default checkExceptionUrl;
