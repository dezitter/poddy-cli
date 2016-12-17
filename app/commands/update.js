import * as provider from '../provider';
import { fetchAndUpdate } from '../feed/fetch-and-update';
import { findOrList } from './utils/find-or-list';
import { onError } from './utils/on-error';
import { reportUpdateResult } from './utils/report-update-result';

export const command = 'update [name]';
export const describe = 'Update all podcasts';

export function handler(argv) {
    const name = argv.name;
    const logger = provider.getLogger();

    findOrList(name)
         .then(onListResolve)
         .catch(onError);

    function onListResolve(podcasts) {
        if (podcasts.length === 0) {
            return logger.warning('You do not have any podcasts to update');
        }

        podcasts.forEach(podcast => {
            fetchAndUpdate(podcast)
                .then(reportUpdateResult)
                .catch(onError);
        });
    }
}
