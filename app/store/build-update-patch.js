import _ from 'lodash';
import { isMoreRecent } from './is-more-recent';

export function buildUpdatePatch(podcast, patch) {
    const episodes = patch.episodes.filter(episode => {
        return isMoreRecent(episode, podcast);
    });

    return {
        $set: _.omit(patch, 'episodes'),
        $push: { episodes: { $each: episodes } }
    };
}
