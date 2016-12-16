import * as provider from '../provider';
import ProgressBar from 'progress';
import { ellipsize } from './utils/ellipsize';
import { onError } from './utils/on-error';
import { parseNumbers } from './utils/parse-numbers';

export const command = 'download <name> <numbers>';
export const describe = 'Download episodes from a podcast';

function createProgressBar(info) {
    return new ProgressBar('downloading [:bar] :rate/bps :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: info.total
    });
}

export function handler(argv) {
    const name = argv.name;
    const numbers = parseNumbers(argv.numbers.toString());

    const logger = provider.getLogger();
    const store = provider.getStore();

    store.find(name)
        .then(podcast => {
            const n = numbers[0];
            const episode = podcast.episodes[n];
            const downloader = provider.getDownloader(podcast);
            let progressBar;

            downloader
                .download(episode)
                .on('start', onDownloadStart)
                .on('progress', onDownloadProgress)
                .on('finish', onDownloadFinish);

            function onDownloadStart(info) {
                const title = ellipsize(episode.title);

                logger.info(`Starting download of ${title}`);
                progressBar = createProgressBar(info);
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
