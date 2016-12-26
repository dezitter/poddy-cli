import * as provider from '../provider';
import { findOrList } from './utils/find-or-list';
import { onError } from './utils/on-error';

export const command = 'list [name] [--limit=NUMBER] [--name-only]';
export const describe = 'List all podcasts';

export const builder = {
    limit: {
        default: Infinity,
        number: true
    },
    'name-only': {
        default: false,
        boolean: true
    }
};

export function handler(argv) {
    const { limit, name, nameOnly } = argv;
    const logger = provider.getDefaultLogger();
    const printer = provider.getListPrinter({ limit, logger, nameOnly });

    findOrList(name)
         .then(onResolve)
         .catch(onError);

    function onResolve(podcasts) {
        printer.showAllPodcasts(podcasts);
    }
}
