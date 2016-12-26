import * as provider from '../provider';
import { findOrList } from './utils/find-or-list';
import { getPodcastNames } from './utils/get-podcast-names';
import { onError } from './utils/on-error';

function handler(args) {
    const name = args.name;
    const limit = args.options.limit;
    const nameOnly = args.options['name-only'];

    const logger = provider.getLogger(this.log.bind(this));
    const printer = provider.getListPrinter({ limit, logger, nameOnly });

    return findOrList(name)
        .then(onResolve)
        .catch(onError);

    function onResolve(podcasts) {
        printer.showAllPodcasts(podcasts);
    }
}

export default function listCommand(vorpal) {
    return vorpal
        .command('list [name]')
        .description('List all podcasts')
        .option('--limit <limit>', 'Limit the number of episodes to show')
        .option('--name-only', 'Show podcast names only')
        .autocomplete({ data: getPodcastNames })
        .action(handler);
}
