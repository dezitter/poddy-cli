export function reportUpdateResult(podcast, logger) {
    const name = podcast.name;
    const nbEps = podcast.episodes.length;

    logger.success(`"${name}" updated, ${nbEps} episode(s) in total.`);
}
