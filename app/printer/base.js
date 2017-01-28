import { getFormattedEpisodeFields } from './utils/get-formatted-episode-fields';

const NO_PODCASTS_MESSAGE = 'You don\'t have any podcasts yet.';
const NO_EPISODES_MESSAGE = 'No episodes found.';

export default class Printer {

    constructor(options) {
        this.count = options.count;
        this.logger = options.logger;
    }

    showAllPodcasts(podcasts) {
        this._warnIfEmpty(podcasts, NO_PODCASTS_MESSAGE);

        podcasts.forEach(podcast => this.showOnePodcast(podcast));
    }

    showOnePodcast(podcast) {
        const message = this._formatPodcast(podcast);

        this.logger.header(message);
        this.showEpisodes(podcast.episodes, podcast);
    }

    showEpisodes(episodes, podcast) {
        this._warnIfEmpty(episodes, NO_EPISODES_MESSAGE);

        episodes
            .reverse()
            .slice(0, this.count)
            .forEach(episode => this.showOneEpisode(episode, podcast));
    }

    showOneEpisode(episode, podcast) {
        const message = this._formatEpisode(episode, podcast);

        this.logger.log(message);
    }

    _warnIfEmpty(collection, message) {
        if (collection.length === 0) {
            this.logger.warning(message);
        }
    }

    _formatPodcast(podcast) {
        const { episodes, name, url } = podcast;
        return `# ${name} - ${episodes.length} episodes (${url})`;
    }

    _formatEpisode(episode, podcast) {
        const ep = getFormattedEpisodeFields(episode, podcast);
        return `[${ep.number}] ${ep.title} - ${ep.duration} - ${ep.filesize} - (${ep.pubDate})`;
    }
}
