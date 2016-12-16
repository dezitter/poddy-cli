import * as provider from 'app/provider';
import { ellipsize } from './utils/ellipsize';
import { fetchAndParse } from 'app/feed/fetch-and-parse';
import { formatDate } from './utils/format-date';
import { onError } from './utils/on-error';

export const command = 'update [name]';
export const describe = 'Update all podcasts';

function findOrList(name) {
    const store = provider.getStore();

    if (name) {
        return store
            .find(name)
            .then(podcast => [podcast]);
    } else {
        return store.list();
    }
}

export function handler(argv) {
    const name = argv.name;
    const store = provider.getStore();
    const logger = provider.getLogger();

    findOrList(name)
         .then(onListResolve)
         .catch(onError);

    function onListResolve(podcasts) {
        if (podcasts.length === 0) {
            return logger.warning('You do not have any podcasts to update');
        }

        podcasts.forEach(podcast => {
            fetchAndParse(podcast.url)
                .then(result => store.update(podcast, result))
                .then(showResults)
                .catch(onError);
        });
    }

    function showResults(podcast) {
        logger.info(podcast.name);

        podcast.episodes.forEach((episode, i) => {
            const dateStr = formatDate(episode.pubDate);
            const title = ellipsize(episode.title);

            logger.log(`[${i}]: ${title} (${dateStr})`);
        });
    }
}
