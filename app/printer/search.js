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

        this.words = _.words(options.query);
    }

    showEpisodes(episodes, podcast) {
        const words = this.words.map(_.lowerCase);
        const filteredEpisodes = episodes.filter(episode => match(episode, words));

        if (episodes.length === 0) {
            this.logger.warning(`"${podcast.name}" does not have any episodes.`);

        } else if (episodes.length > 0 && filteredEpisodes.length === 0) {
            this.logger.warning('No match found.');
        }

        filteredEpisodes
            .forEach(episode => this.showOneEpisode(episode, podcast));
    }

    showOneEpisode(episode, podcast) {
        const message = this._formatEpisode(episode, podcast);
        this.logger.highlight(message, this.words);
    }
}
