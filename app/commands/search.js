import * as provider from '../provider';

export const command = 'search <text>';
export const describe = 'Search for episodes matching the text';

function match(episode, text) {
    const title = episode.title.toLowerCase();

    return title.indexOf(text) !== -1;
}

export function handler(argv) {
    const text = argv.text.toLowerCase();
    const store = provider.getStore();
    const printer = provider.getSearchPrinter({
        predicate: function(episode) {
            return match(episode, text);
        }
    });

    store.list()
        .then(onResolve);

    function onResolve(podcasts) {
        printer.showAllPodcasts(podcasts);
    }
}
