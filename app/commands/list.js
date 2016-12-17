import { findOrList } from './utils/find-or-list';
import { onError } from './utils/on-error';
import { reportAll } from './utils/report-all';

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

    findOrList(name)
         .then(onResolve)
         .catch(onError);

    function onResolve(podcasts) {
        reportAll(podcasts, limit);
    }
}
