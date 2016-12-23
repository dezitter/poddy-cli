import request from 'request-promise-native';

export function fetchFeed(options) {
    return request({
        uri: options.url,
        resolveWithFullResponse: true,
        headers: buildHeaders(options)
    });
}

function buildHeaders(options={}) {
    let headers;

    if (options.cache && options.cache.etag) {
        headers = { 'If-None-Match': options.cache.etag };
    }
    else if (options.syncedAt) {
        headers = { 'If-Modified-Since': options.syncedAt.toUTCString() };
    }

    return headers;
}
