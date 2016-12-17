import { formatDate } from './utils/format-date';
import { formatTitle } from './utils/format-title';
import { padNumberStart } from './utils/pad-number-start';

export default class Reporter {

    constructor(options) {
        this.limit = options.limit || Infinity;
        this.logger = options.logger;
    }

    showAllPodcasts(podcasts) {
        if (podcasts.length === 0) {
            this.logger.warning('You don\'t have any podcasts yet.');
        }

        podcasts.forEach(podcast => this.showOnePodcast(podcast));
    }

    showOnePodcast(podcast) {
        const epsNumber = podcast.episodes.length;

        this.logger.header(`# ${podcast.name} - ${epsNumber} episodes (${podcast.url})`);
        this.showEpisodes(podcast.episodes, podcast);
        this.logger.log('');
    }

    showEpisodes(episodes, podcast) {
        if (episodes.length === 0) {
            this.logger.warning(`"${podcast.name}" does not have any episodes.`);
        }

        episodes
            .slice(0, this.limit)
            .forEach(episode => this.showOneEpisode(episode, podcast));

    }

    showOneEpisode(episode, podcast) {
        const epsNumber = podcast.episodes.length;

        const number = padNumberStart(episode.number, epsNumber.toString().length);
        const pubDate = formatDate(episode.pubDate);
        const title = formatTitle(episode.title);

        this.logger.log(`  [${number}] ${title} (${pubDate})`);
    }
}
