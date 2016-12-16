import EventEmitter from 'events';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import request from 'request';
import url from 'url';

function getFilename(episode) {
    return path.basename(
        url.parse(episode.enclosure.url).pathname
    );
}

function getFilepath(root, podcast, episode) {
    const filename = getFilename(episode);

    return path.join(root, podcast.name, filename);
}

export default class Downloader extends EventEmitter {

    constructor(podcast, options) {
        super();

        this.podcast = podcast;
        this.directory = options.directory;
    }

    download(episode) {
        const filepath = getFilepath(this.directory, this.podcast, episode);
        const dirpath = path.dirname(filepath);

        let total = 0;
        let transferred = 0;

        mkdirp(dirpath, err => {
            if (err) throw err;

            request(episode.enclosure.url)
                .on('response', onResponse.bind(this))
                .on('data', onData.bind(this))
                .on('end', onEnd.bind(this))
                .pipe(fs.createWriteStream(filepath));
        });


        function onResponse(response) {
            total = parseInt(response.headers['content-length'], 10);
            this.emit('start', { filepath, total });
        }

        function onData(data) {
            const length = data.length;

            this.emit('progress', {
                length,
                total,
                transferred: (transferred + length)
            });
        }

        function onEnd() {
            this.emit('finish', { filepath });
        }

        return this;
    }
}
