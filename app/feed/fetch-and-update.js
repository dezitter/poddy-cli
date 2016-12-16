import * as provider from 'app/provider';
import { fetchAndParse } from 'app/feed/fetch-and-parse';

export function fetchAndUpdate(podcast) {
    const store = provider.getStore();
    const { cache, url } = podcast;

    return fetchAndParse({ cache, url })
        .then(onResolve);

    function onResolve(result) {
        if (!result.fromCache) {
            const patch = buildUpdatePatch(result);
            return store.update(podcast, patch);
        }

        return podcast;
    }
}

function buildUpdatePatch(result) {
    const cache = Object.assign({}, result.cache, { syncedAt: new Date() });
    return Object.assign({ cache }, result.feed);
}
