import * as provider from 'app/provider';
import { onError } from './utils/on-error';
import { formatDate } from './utils/format-date';
import { formatTitle } from './utils/format-title';
import { padNumberStart } from './utils/pad-number-start';

export const command = 'list [--limit=NUMBER]';
export const describe = 'List all podcasts';

export const builder = {
    limit: {
        default: Infinity,
        number: true
    }
};

export function handler(argv) {
    const store = provider.getStore();
    const logger = provider.getLogger();
    const limit = argv.limit;

    store.list()
         .then(onResolve)
         .catch(onError);

    function onResolve(podcasts) {
        if (podcasts.length === 0) {
            logger.info('You don\'t have any podcasts yet.');
        }

        podcasts.forEach(podcast => {
            const epsNumber = podcast.episodes.length;

            logger.log(`# ${podcast.name} - ${epsNumber} episodes (${podcast.url})`);

            podcast.episodes
                .slice(0, limit)
                .forEach((episode, i) => {
                    const number = padNumberStart(i, epsNumber.toString().length);
                    const pubDate = formatDate(episode.pubDate);
                    const title = formatTitle(episode.title);

                    logger.log(`[${number}] ${title} (${pubDate})`);
                });

            logger.log('');
        });
    }
}
