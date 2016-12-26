import * as provider from '../../provider';

export function reportUpdateResult(podcast) {
    const name = podcast.name;
    const nbEps = podcast.episodes.length;
    const logger = provider.getDefaultLogger();

    logger.success(`"${name}" updated, ${nbEps} episode(s) in total.`);
}
