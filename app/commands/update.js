import * as provider from 'app/provider';
import { fetchAndUpdate } from 'app/feed/fetch-and-update';
import { findOrList } from './utils/find-or-list';
import { onError } from './utils/on-error';

export const command = 'update [name]';
export const describe = 'Update all podcasts';

export function handler(argv) {
    const name = argv.name;
    const logger = provider.getLogger();

    findOrList(name)
         .then(onListResolve)
         .catch(onError);

    function onListResolve(podcasts) {
        if (podcasts.length === 0) {
            return logger.warning('You do not have any podcasts to update');
        }

        podcasts.forEach(podcast => {
            fetchAndUpdate(podcast)
                .then(showResults)
                .catch(onError);
        });
    }

    function showResults(podcast) {
        const name = podcast.name;
        const nbEps = podcast.episodes.length;

        logger.info(`"${name}" updated, ${nbEps} episodes found.`);
    }
}
