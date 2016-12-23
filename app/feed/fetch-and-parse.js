import { fetchFeed} from './fetch-feed';
import { parseResponse} from './parse-response';

export function fetchAndParse(options) {
    return fetchFeed(options)
        .then(onFetchResolve)
        .catch(onFetchError);
}

function onFetchResolve(response) {
    return parseResponse(response.body)
        .then(result => {
            return Object.assign({
                cache: getCacheEntity(response),
            }, result);
        });
}

function getCacheEntity(response) {
    const etag = response.headers['etag'];
    if (etag) return { etag };
}

function onFetchError(error) {
    if (error.statusCode === 304) {
        return { fromCache: true };
    }

    throw error;
}
