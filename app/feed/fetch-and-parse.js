import { fetchFeed} from './fetch-feed';
import { parseResponse} from './parse-response';

export function fetchAndParse(url) {
    return fetchFeed(url)
        .then(parseResponse);
}
