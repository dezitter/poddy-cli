import BasePrinter from './base';
import _ from 'lodash';

function match(episode, words) {
    const title = episode.title.toLowerCase();

    return _.some(words, word => {
        return title.indexOf(word) !== -1;
    });
}

export default class SearchPrinter extends BasePrinter {

    constructor(options) {
        super(options);

        this.words = _.words(options.query).map(_.lowerCase);
    }

    showEpisodes(episodes, podcast) {
        const filteredEpisodes = episodes.filter(episode => match(episode, this.words));

        if (episodes.length === 0) {
            this.logger.warning(`"${podcast.name}" does not have any episodes.`);

        } else if (episodes.length > 0 && filteredEpisodes.length === 0) {
            this.logger.warning('No match found.');
        } else {
            this.logger.success(`Found ${filteredEpisodes.length} episode(s).`);
        }

        filteredEpisodes
            .forEach(episode => this.showOneEpisode(episode, podcast));
    }

    showOneEpisode(episode, podcast) {
        const { duration, filesize, number, pubDate, title } = this._getFormattedEpisodeFields(episode, podcast);

        this.logger.highlight(`  [${number}] ${title} - ${duration} - ${filesize} - (${pubDate})`, this.words);
    }
}
