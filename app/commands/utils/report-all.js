import * as provider from '../../provider';
import { formatDate } from './format-date';
import { formatTitle } from './format-title';
import { padNumberStart } from './pad-number-start';

export function reportAll(podcasts, epsLimit=Infinity) {
    const logger = provider.getLogger();

    if (podcasts.length === 0) {
        logger.info('You don\'t have any podcasts yet.');
    }

    podcasts.forEach(podcast => reportOne(podcast, epsLimit));
}

function reportOne(podcast, epsLimit) {
    const logger = provider.getLogger();
    const epsNumber = podcast.episodes.length;

    logger.log(`# ${podcast.name} - ${epsNumber} episodes (${podcast.url})`);

    podcast.episodes
        .slice(0, epsLimit)
        .forEach(episode => reportEpisode(episode, podcast));

    logger.log('');
}

function reportEpisode(episode, podcast) {
    const logger = provider.getLogger();
    const epsNumber = podcast.episodes.length;

    const number = padNumberStart(episode.number, epsNumber.toString().length);
    const pubDate = formatDate(episode.pubDate);
    const title = formatTitle(episode.title);

    logger.log(`[${number}] ${title} (${pubDate})`);
}
