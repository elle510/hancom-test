import axios from 'axios';

axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3/search';

export const search = (word) => {
    // const {
    //     url,
    //     method = 'POST',
    //     headers,
    //     params,
    //     data, // data 는 사용 못하게 하기 위해
    //     ...others
    // } = config;

    // let reqParams = { data: params };
    // if (method.toLowerCase() === 'get') {
    //     reqParams = { params };
    // }

    return axios({
        // url,
        method: 'GET',
        params: { 
            q: word,
            part: 'snippet',
            type: 'video',
            maxResults: 20,
            // key: 'AIzaSyAlBI4a0OLtdiLcaYixcQHEvxTiYv7E2Mg',
            key: 'AIzaSyCRoEU9z-cX9kIuHMaTvWYb132ljQ9o4Tg',
        },
        // headers: { ...headers },
        // ...reqParams,
        // ...others,
    })
        .then((response) => {
            // console.log('response', response);
            return response.data;
        })
        .catch((error) => {
            // if (error.response.status === 401) {
            //     window.location.href = error.response.data;
            //     return '';
            // }
            console.error('request error', error);
            console.error('request error.response', error.response);
            throw new Error(error);
        });
};

export const test = () => {};
