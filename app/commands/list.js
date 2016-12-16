import * as provider from 'app/provider';
import { onError } from './utils/on-error';
import { ellipsize } from './utils/ellipsize';
import { formatDate } from './utils/format-date';

export const command = 'list';
export const describe = 'List all podcasts';

export function handler() {
    const store = provider.getStore();
    const logger = provider.getLogger();

    store.list()
         .then(onResolve)
         .catch(onError);

    function onResolve(podcasts) {
        if (podcasts.length === 0) {
            logger.info('You don\'t have any podcasts yet.');
        }

        podcasts.forEach(podcast => {
            logger.log(`${podcast.name} (${podcast.url})`);

            podcast.episodes.forEach((episode, i) => {
                const title = ellipsize(episode.title);
                const pubDate = formatDate(episode.pubDate);

                logger.log(`[${i}]: ${title} (${pubDate})`);
            });
        });
    }
}
