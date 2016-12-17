import EventEmitter from 'events';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import request from 'request';
import { getFilepath } from './get-filepath';

export default class Downloader extends EventEmitter {

    constructor(podcast, options) {
        super();

        this.podcast = podcast;
        this.directory = options.directory;
    }

    download(episode) {
        this.filepath = getFilepath(this.directory, this.podcast, episode);

        const dirpath = path.dirname(this.filepath);
        let total = 0;
        let transferred = 0;

        mkdirp(dirpath, err => {
            if (err) throw err;

            request(episode.enclosure.url)
                .on('response', onResponse.bind(this))
                .on('data', onData.bind(this))
                .on('end', onEnd.bind(this))
                .pipe(fs.createWriteStream(this.filepath));
        });

        function onResponse(response) {
            total = parseInt(response.headers['content-length'], 10);
            this.emit('start', { filepath: this.filepath, total });
        }

        function onData(data) {
            const length = data.length;

            transferred = transferred + length;
            this.emit('progress', { length, total, transferred });
        }

        function onEnd() {
            this.emit('finish', { filepath: this.filepath });
        }

        return this;
    }

    abort(cb) {
        fs.unlink(this.filepath, cb);
    }
}
