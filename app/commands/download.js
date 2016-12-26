import * as provider from '../provider';
import { ellipsize } from '../utils/ellipsize';
import { onError } from './utils/on-error';
import { parseNumbers } from './utils/parse-numbers';

export const command = 'download <name> <numbers>';
export const describe = 'Download episodes from a podcast';

export function handler(argv) {
    const name = argv.name;

    const logger = provider.getDefaultLogger();
    const store = provider.getStore();

    store.find(name)
        .then(onResolve)
        .catch(onError);

    function onResolve(podcast) {
        let progressBar;
        const numbers = parseNumbers(argv.numbers.toString());
        const downloader = provider.getDownloader(podcast)
            .on('start', onDownloadStart)
            .on('progress', onDownloadProgress)
            .on('finish', onDownloadFinish);

        downloadNext();

        process.on('SIGINT', onInterrupt);

        function onInterrupt() {
            downloader.abort(onAbort);

            function onAbort() {
                logger.warning('Aborting download and exitting');
                process.exit();
            }
        }

        function downloadNext() {
            const episodeNumber = numbers.shift();

            if (episodeNumber !== undefined) {
                startDownload(episodeNumber);
            }
        }

        function startDownload(episodeNumber) {
            const episode = podcast.episodes.find(episode => {
                return episode.number === episodeNumber;
            });

            if (episode) {
                downloader.download(episode);
            } else {
                logger.warning(`Episode n°${episodeNumber} of ${podcast.name} could not be found`);
                downloadNext();
            }
        }

        function onDownloadStart(info) {
            const total = info.total;
            const title = ellipsize(info.episode.title);

            logger.info(`Starting download of ${title}`);
            progressBar = provider.getProgressBar({ total });
        }

        function onDownloadProgress(info) {
            progressBar.tick(info.length);
        }

        function onDownloadFinish(info) {
            const title = ellipsize(info.episode.title);
            logger.success(`${title} successfully downloaded at ${info.filepath}`);

            downloadNext();
        }
    }
}
