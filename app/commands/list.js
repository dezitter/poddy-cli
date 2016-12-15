import * as provider from 'app/provider';
import { onError } from './utils/on-error';

export const command = 'list';
export const describe = 'List all feeds';

export function handler() {
    const store = provider.getStore();
    const logger = provider.getLogger();

    store.list()
         .then(onResolve)
         .catch(onError);

    function onResolve(feeds) {
        logger.info(`You currently have ${feeds.length} feed(s)`);

        feeds.forEach((feed, i) => {
            logger.log(`${i}: ${feed.name} (${feed.url})`);
        });
    }
}
