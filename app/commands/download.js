import * as provider from '../provider';
import prettyBytes from 'pretty-bytes';
import { ellipsize } from '../utils/ellipsize';
import { getPodcastNames } from './utils/get-podcast-names';
import { onError } from './utils/on-error';
import { parseNumbers } from './utils/parse-numbers';

function getHandler(vorpal) {
    return function handler(args) {
        const name = args.name;

        const logger = provider.getLogger(this.log.bind(this));
        const store = provider.getStore();

        return store.find(name)
            .then(onResolve)
            .catch(onError);

        function onResolve(podcast) {
            const numbers = parseNumbers(args.numbers.toString());

            return new Promise(executor);

            function executor(resolve) {
                const downloader = provider.getDownloader(podcast)
                    .on('start', onDownloadStart)
                    .on('progress', onDownloadProgress)
                    .on('finish', onDownloadFinish);

                downloadNext();

                function downloadNext() {
                    const episodeNumber = numbers.shift();

                    if (episodeNumber !== undefined) {
                        startDownload(episodeNumber);
                    } else {
                        resolve();
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

                    logger.info(`Starting download of ${title} (${total})`);
                }

                function onDownloadProgress(info) {
                    const transferred = prettyBytes(info.transferred).padStart();
                    const total = prettyBytes(info.total);

                    vorpal.ui.redraw(`Downloading: ${ transferred } / ${total}`);
                }

                function onDownloadFinish(info) {
                    const title = ellipsize(info.episode.title);
                    logger.success(`${title} successfully downloaded at ${info.filepath}`);

                    downloadNext();
                }
            }
        }
    };
}

export default function listCommand(vorpal) {
    return vorpal
        .command('download <name> <numbers>')
        .description('Download episodes from a podcast')
        .autocomplete({ data: getPodcastNames })
        .action( getHandler(vorpal) );
}
