import _ from 'lodash';

export function isMoreRecent(episode, podcast) {
    const wasSynced = _.isDate(podcast.syncedAt);
    const syncedAt = (wasSynced && podcast.syncedAt) || null;

    return !wasSynced
    ||      syncedAt < episode.pubDate;
}
