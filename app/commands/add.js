import * as provider from 'app/provider';
import { onError } from './utils/on-error';

export const command = 'add <name> <url>';
export const describe = 'Add a podcast feed';

export function handler(argv) {
    const { name, url } = argv;

    const store = provider.getStore();
    const logger = provider.getLogger();

    store.add(name, url)
         .then(feed => {
             logger.success(`Added ${feed.name} (${feed.url})`);
         })
         .catch(onError);
}
