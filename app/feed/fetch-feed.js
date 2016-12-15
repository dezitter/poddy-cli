import request from 'request-promise-native';

export function fetchFeed(feed) {
    return request(feed.url);
}
