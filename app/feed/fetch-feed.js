import request from 'request-promise-native';

export function fetchFeed(options) {
    return request({
        uri: options.url,
        resolveWithFullResponse: true,
        headers: buildHeaders(options.cache)
    });
}

function buildHeaders(cache={}) {
    let headers;

    if (cache.etag) {
        headers = { 'If-None-Match': cache.etag };
    }
    else if (cache.syncedAt) {
        headers = { 'If-Modified-Since': cache.syncedAt.toUTCString() };
    }

    return headers;
}
