import * as provider from '../provider';
import { onError } from './utils/on-error';

export const command = 'add <name> <url>';
export const describe = 'Add a podcast';

export function handler(argv) {
    const { name, url } = argv;

    const store = provider.getStore();
    const logger = provider.getLogger();

    store.add(name, url)
         .then(podcast => {
             logger.success(`Added ${podcast.name} (${podcast.url})`);
         })
         .catch(onError);
}
