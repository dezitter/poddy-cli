import * as provider from '../provider';
import { findOrList } from './utils/find-or-list';
import { getPodcastNames } from './utils/get-podcast-names';
import { onError } from './utils/on-error';

const DEFAULT_COUNT = parseInt(process.env.DEFAULT_COUNT, 10);

function handler(args) {
    const name = args.name;
    const count = getCount(args.options);
    const nameOnly = args.options['name-only'];

    const logger = provider.getLogger(this.log.bind(this));
    const printer = provider.getListPrinter({ count, logger, nameOnly });

    return findOrList(name)
        .then(onResolve)
        .catch(onError);

    function onResolve(podcasts) {
        printer.showAllPodcasts(podcasts);
    }
}

function getCount(options) {
    let count = options.count;

    if (options.all) {
        return Infinity;
    }

    if (count === undefined) {
        count = DEFAULT_COUNT;
    }

    if (typeof count !== 'number' || Number.isNaN(count)) {
        throw new Error(`Invalid count, got "${count}"`);
    }

    return count;
}

export default function listCommand(vorpal) {
    return vorpal
        .command('list [name]')
        .description('List all podcasts')
        .option('-a, --all', 'Show all episodes')
        .option('-c, --count [count]', 'Number of episodes to show / podcast')
        .option('--name-only', 'Show podcast names only')
        .autocomplete({ data: getPodcastNames })
        .action(handler);
}
