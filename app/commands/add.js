import isUrl from 'validator/lib/isURL';

import * as provider from '../provider';
import { fetchAndUpdate } from '../feed/fetch-and-update';
import { onError } from './utils/on-error';
import { reportUpdateResult } from './utils/report-update-result';

function handler(args) {
    const { name, url } = args;

    const store = provider.getStore();
    const logger = provider.getLogger(this.log.bind(this));

    if (!isUrl(url)) {
        throw new Error(`Invalid feed url "${url}"`);
    }

    return store.add(name, url)
        .then(podcast => {
            logger.success(`Added ${podcast.name} (${podcast.url})`);
            logger.log(`Updating ${podcast.name}, please be patient...`);

            return fetchAndUpdate(podcast)
                .then(podcast => reportUpdateResult(podcast, logger));
        })
        .catch(onError);
}

export default function addCommand(vorpal) {
    return vorpal
        .command('add <name> <url>')
        .description('Add a podcast')
        .action(handler);
}
