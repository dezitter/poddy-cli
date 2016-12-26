import * as provider from '../provider';

function handler(args) {
    const text = args.terms.join(' ');
    const store = provider.getStore();
    const logger = provider.getLogger(this.log.bind(this));
    const printer = provider.getSearchPrinter({ logger, query: text });

    return store.list()
        .then(onResolve);

    function onResolve(podcasts) {
        printer.showAllPodcasts(podcasts);
    }
}

export default function updateCommand(vorpal) {
    return vorpal
        .command('search <terms...>')
        .description('Search for episodes matching the text query')
        .action(handler);
}
