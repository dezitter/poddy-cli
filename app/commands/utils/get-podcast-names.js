import { findOrList } from './find-or-list';

export function getPodcastNames() {
    return findOrList()
        .then(podcasts => {
            return podcasts.map(podcast => podcast.name);
        });
}
