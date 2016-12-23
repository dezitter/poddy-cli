import EventEmitter from 'events';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import request from 'request';
import { getFilepath } from './get-filepath';

function getInitialState(episode) {
    return {
        episode,
        total: 0,
        transferred: 0
    };
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

        this.state = Object.assign({ filepath }, getInitialState(episode));

        mkdirp(dirpath, (err) => {
            if (err) throw err;
            fs.stat(filepath, onStat.bind(this));
        });

        function onStat(err) {
            // file exists
            if (err === null) return this._emitFinish();

            request(episode.enclosure.url)
                .on('response', this._emitStart.bind(this))
                .on('data', this._emitProgress.bind(this))
                .on('end', this._emitFinish.bind(this))
                .pipe(fs.createWriteStream(filepath));
        }

        return this;
    }

    _emitStart(response) {
        this._updateTotal(response);
        this.emit('start', this.state);
    }

    _updateTotal(response) {
        this.state.total = parseInt(response.headers['content-length'], 10);
    }

    _emitProgress(data) {
        const length = data.length;

        this._updateTransferred(length);
        this.emit('progress', Object.assign({ length }, this.state));
    }

    _updateTransferred(chunkLength) {
        this.state.transferred +=  chunkLength;
    }

    _emitFinish() {
        this.emit('finish', this.state);
    }

    abort(cb) {
        fs.unlink(this.state.filepath, cb);
    }
}
