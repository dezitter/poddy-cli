import * as provider from 'app/provider';
import { onError } from './utils/on-error';

export const command = 'list';
export const describe = 'List all podcasts';

export function handler() {
    const store = provider.getStore();
    const logger = provider.getLogger();

    store.list()
         .then(onResolve)
         .catch(onError);

    function onResolve(podcasts) {
        logger.info(`You currently have ${podcasts.length} podcast(s)`);

        podcasts.forEach((podcast, i) => {
            logger.log(`${i}: ${podcast.name} (${podcast.url})`);
        });
    }
}
