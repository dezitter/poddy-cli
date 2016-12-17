import * as provider from '../provider';
import { findOrList } from './utils/find-or-list';
import { onError } from './utils/on-error';

export const command = 'list [name] [--limit=NUMBER]';
export const describe = 'List all podcasts';

export const builder = {
    limit: {
        default: Infinity,
        number: true
    }
};

export function handler(argv) {
    const { limit, name } = argv;
    const reporter = provider.getReporter({ limit });

    findOrList(name)
         .then(onResolve)
         .catch(onError);

    function onResolve(podcasts) {
        reporter.showAllPodcasts(podcasts);
    }
}
