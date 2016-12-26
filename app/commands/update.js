import * as provider from '../provider';
import { fetchAndUpdate } from '../feed/fetch-and-update';
import { findOrList } from './utils/find-or-list';
import { getPodcastNames } from './utils/get-podcast-names';
import { onError } from './utils/on-error';
import { reportUpdateResult } from './utils/report-update-result';

function handler(args) {
    const name = args.name;
    const logger = provider.getLogger(this.log.bind(this));

    return findOrList(name)
        .then(onListResolve)
        .catch(onError);

    function onListResolve(podcasts) {
        const length = podcasts.length;

        if (length === 0) {
            return logger.warning('You do not have any podcasts to update.');
        }

        logger.info(`Updating ${length} podcasts, please be patient...`);

        const promises = podcasts.map(podcast => {
            return fetchAndUpdate(podcast)
                .then(podcast => reportUpdateResult(podcast, logger))
                .catch(onError);
        });

        return Promise.all(promises);
    }
}

export default function updateCommand(vorpal) {
    return vorpal
        .command('update [name]')
        .description('Update all podcasts, or the specified one.')
        .autocomplete({ data: getPodcastNames })
        .action(handler);
}
