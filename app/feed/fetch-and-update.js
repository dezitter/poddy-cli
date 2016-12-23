import * as provider from '../provider';
import { fetchAndParse } from './fetch-and-parse';

export function fetchAndUpdate(podcast) {
    const store = provider.getStore();
    const { cache, syncedAt, url } = podcast;

    return fetchAndParse({ cache, syncedAt, url })
        .then(onResolve);

    function onResolve(result) {
        if (!result.fromCache) {
            const patch = buildUpdatePatch(result);
            return store.update(podcast.name, patch);
        }

        return podcast;
    }
}

function buildUpdatePatch(result) {
    return Object.assign({ syncedAt: new Date() }, result);
}
