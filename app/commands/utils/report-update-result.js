import * as provider from '../../provider';

export function reportUpdateResult(podcast) {
    const name = podcast.name;
    const nbEps = podcast.episodes.length;
    const logger = provider.getLogger();

    logger.info(`"${name}" updated, ${nbEps} episodes in total.`);
}
