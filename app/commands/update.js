import * as provider from 'app/provider';
import { fetchAndParse } from 'app/feed/fetch-and-parse';
import { formatDate } from './utils/format-date';
import { onError } from './utils/on-error';

export const command = 'update';
export const describe = 'Update all feeds';

export function handler() {
    const store = provider.getStore();
    const logger = provider.getLogger();

    store.list()
         .then(onListResolve)
         .catch(onError);

    function onListResolve(feeds) {
        if (feeds.length === 0) {
            return logger.warning('You do not have any feeds to update');
        }

        feeds.forEach(feed => {
            fetchAndParse(feed)
                .then(result => store.update(feed, result))
                .then(showResults)
                .catch(onError);
        });
    }

    function showResults(feed) {
        logger.info(feed.name);

        feed.episodes.forEach((item, i) => {
            logger.log(`[${i}]: ${item.title} (${formatDate(item.pubDate)})`);
        });
    }
}
