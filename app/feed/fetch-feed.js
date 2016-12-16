import request from 'request-promise-native';

export function fetchFeed(url) {
    return request(url);
}
