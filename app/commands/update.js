import * as provider from 'app/provider';
import { ellipsize } from './utils/ellipsize';
import { fetchAndParse } from 'app/feed/fetch-and-parse';
import { formatDate } from './utils/format-date';
import { onError } from './utils/on-error';

export const command = 'update [name]';
export const describe = 'Update all feeds';

function findOrList(name) {
    const store = provider.getStore();

    if (name) {
        return store
            .find(name)
            .then(feed => [feed]);
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
            const dateStr = formatDate(item.pubDate);
            const title = ellipsize(item.title);

            logger.log(`[${i}]: ${title} (${dateStr})`);
        });
    }
}
