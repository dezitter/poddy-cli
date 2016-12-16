import * as provider from 'app/provider';
import { fetchAndParse } from 'app/feed/fetch-and-parse';

export function fetchAndUpdate(podcast) {
    const store = provider.getStore();

    return fetchAndParse(podcast.url)
        .then(onResolve);

    function onResolve(result) {
        const patch = Object.assign({ syncedAt: new Date() }, result);
        return store.update(podcast, patch);
    }
}

