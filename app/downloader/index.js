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
        this.total = 0;
        this.transferred = 0;

        const dirpath = path.dirname(this.filepath);

        mkdirp(dirpath, (err) => {
            if (err) throw err;
            fs.stat(this.filepath, onStat.bind(this));
        });

        function onStat(err) {
            // file exists
            if (err === null) {
                return this._emitFinish();
            }

            request(episode.enclosure.url)
                .on('response', this._emitStart.bind(this))
                .on('data', this._emitProgress.bind(this))
                .on('end', this._emitFinish.bind(this))
                .pipe(fs.createWriteStream(this.filepath));
        }

        return this;
    }

    _emitStart(response) {
        this.total = parseInt(response.headers['content-length'], 10);

        this.emit('start', {
            filepath: this.filepath,
            total: this.total
        });
    }

    _emitProgress(data) {
        const length = data.length;

        this.transferred = this.transferred + length;

        this.emit('progress', {
            length,
            total: this.total,
            transferred: this.transferred
        });
    }

    _emitFinish() {
        this.emit('finish', {
            filepath: this.filepath
        });
    }

    abort(cb) {
        fs.unlink(this.filepath, cb);
    }
}
