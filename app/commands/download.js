import * as provider from '../provider';
import { ellipsize } from '../utils/ellipsize';
import { onError } from './utils/on-error';
import { parseNumbers } from './utils/parse-numbers';

export const command = 'download <name> <numbers>';
export const describe = 'Download episodes from a podcast';

export function handler(argv) {
    const name = argv.name;
    const numbers = parseNumbers(argv.numbers.toString());

    const logger = provider.getLogger();
    const store = provider.getStore();

    store.find(name)
        .then(podcast => {
            logger.info(`The following episodes of "${name}" will be downloaded shortly: ${numbers.join(', ')}`);

            const n = numbers[0];
            const episode = podcast.episodes.find(episode => (episode.number === n));
            const downloader = provider.getDownloader(podcast);
            let progressBar;

            downloader
                .download(episode)
                .on('start', onDownloadStart)
                .on('progress', onDownloadProgress)
                .on('finish', onDownloadFinish);

            process.on('SIGINT', onInterrupt);

            function onInterrupt() {
                downloader.abort(onAbort);

                function onAbort(err) {
                    if (err) logger.error(err);
                    process.exit();
                }
            }

            function onDownloadStart(info) {
                const title = ellipsize(episode.title);

                logger.info(`Starting download of ${title}`);
                progressBar = provider.getProgressBar(info);
            }

            function onDownloadProgress(info) {
                progressBar.tick(info.length);
            }

            function onDownloadFinish(info) {
                const title = ellipsize(episode.title);

                logger.success(`${title} successfully downloaded at ${info.filepath}`);
            }
        })
        .catch(onError);

}
