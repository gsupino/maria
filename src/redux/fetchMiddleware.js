import url from 'url';

let baseUrl;

if (typeof window === 'undefined') {
    const port = '8080';//config.apiPort;
    baseUrl = `http://localhost:${port}`;
} else {
    baseUrl = '/';
}

function formatUrl(path) {
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

function fetchMiddleware({ getState }) {
    return (next) => (action) => {

        return action => {
            console.log('yes')
            const { urlPoint, types,fetchParams, ...rest } = action;
            if (!urlPoint) {
                return next(action);
            }

            const [REQUEST, SUCCESS, FAILURE] = types;
            next({...rest, type: REQUEST});
            let urlTo = formatUrl(urlPoint);
            let params = fetchParams || {};
            return fetch(urlTo, params)
                .then(checkStatus)
                .then(res => res.json())
                .then((res) => next({...rest, res, type: SUCCESS}))
                .catch((error) => next({...rest, error, type: FAILURE}))

        };
    }
}
export default fetchMiddleware;