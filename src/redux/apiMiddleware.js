import url from 'url';


function formatUrl(path) {
    let baseUrl;

    if (typeof window === 'undefined') {
        const port = '8080';//config.apiPort;
        baseUrl = `http://localhost:${port}`;
    } else {
        baseUrl = '/api';
    }

    if (typeof path === 'undefined') return baseUrl;
    return url.resolve(baseUrl, path);
}


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function callAPIMiddleware({ dispatch, getState }) {
    return function (next) {
        return function (action) {
            const callAPI = action.CALL_API;
            if (typeof callAPI === 'undefined') {
                return next(action);
            }
            let { endpoint, types, params, payload } = callAPI;

            if (typeof endpoint !== 'string') {
                throw new Error('Specify a string endpoint URL.');
            }
            if (!Array.isArray(types) || types.length !== 3) {
                throw new Error('Expected an array of three action types.');
            }
            if (!types.every(type => typeof type === 'string')) {
                throw new Error('Expected action types to be strings.');
            }

            let param=params ||{};

            const [requestType, successType, failureType] = types;

            dispatch(Object.assign({}, payload, {
                type: requestType
            }));
            console.log(formatUrl(endpoint))
            return fetch(formatUrl(endpoint), param)
                .then(checkStatus)
                .then(res => res.json())
                .then((res) => next({res, type: successType}))
                .catch((error) => next({error, type: failureType}))

        };
    };
}

export default callAPIMiddleware;