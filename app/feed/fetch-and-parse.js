import { fetchFeed} from './fetch-feed';
import { parseResponse} from './parse-response';

export function fetchAndParse(feed) {
    return fetchFeed(feed)
        .then(parseResponse);
}
