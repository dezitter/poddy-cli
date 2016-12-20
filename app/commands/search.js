import * as provider from '../provider';

export const command = 'search';
export const describe = 'Search for episodes matching the text query';

export function handler(argv) {
    const text = argv._.slice(1).join(' ');
    const store = provider.getStore();
    const printer = provider.getSearchPrinter({ query: text });

    store.list()
        .then(onResolve);

    function onResolve(podcasts) {
        printer.showAllPodcasts(podcasts);
    }
}
