import isUrl from 'validator/lib/isURL';

import * as provider from '../provider';
import { fetchAndUpdate } from '../feed/fetch-and-update';
import { onError } from './utils/on-error';
import { reportUpdateResult } from './utils/report-update-result';

export const command = 'add <name> <url>';
export const describe = 'Add a podcast';

export function handler(argv) {
    const { name, url } = argv;

    const store = provider.getStore();
    const logger = provider.getLogger();

    if (!isUrl(url)) {
        throw new Error(`Invalid feed url "${url}"`);
    }

    store.add(name, url)
         .then(podcast => {
             logger.success(`Added ${podcast.name} (${podcast.url})`);
             logger.log(`Updating ${podcast.name}, please be patient...`);

             return fetchAndUpdate(podcast)
                .then(reportUpdateResult);
         })
         .catch(onError);
}
