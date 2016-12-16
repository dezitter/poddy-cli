import * as provider from 'app/provider';
import { onError } from './utils/on-error';
import { formatDate } from './utils/format-date';
import { formatTitle } from './utils/format-title';
import { padNumberStart } from './utils/pad-number-start';

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
            const epsNumber = podcast.episodes.length;

            logger.log(`# ${podcast.name} (${podcast.url})`);

            podcast.episodes.forEach((episode, i) => {
                const number = padNumberStart(i, epsNumber.toString().length);
                const pubDate = formatDate(episode.pubDate);
                const title = formatTitle(episode.title);

                logger.log(`[${number}] ${title} (${pubDate})`);
            });

            logger.log('');
        });
    }
}
