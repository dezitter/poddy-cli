/* eslint no-console: ["error", { allow: ["log"] }] */

import Datastore from 'nedb';
import ProgressBar from 'progress';

import Downloader from './downloader';
import Logger from './logger';
import ListPrinter from './printer/list';
import SearchPrinter from './printer/search';
import Store from './store';

const db = createDatabase();
const downloadDirectory = process.env.DOWNLOAD_DIRECTORY;

function createDatabase() {
    const db = new Datastore({
        autoload: true,
        timestampData: true,
        filename: process.env.DB_FILENAME
    });

    db.ensureIndex({ fieldName: 'url',  unique: true });
    db.ensureIndex({ fieldName: 'name', unique: true });

    return db;
}

const store = new Store({ db });

export function getStore() {
    return store;
}

export function getLogger(log) {
    return new Logger(log);
}

export function getDefaultLogger() {
    return getLogger(console.log.bind(console));
}

export function getDownloader(podcast) {
    return new Downloader(podcast, { directory: downloadDirectory });
}

export function getListPrinter(options) {
    return new ListPrinter(options);
}

export function getSearchPrinter(options) {
    return new SearchPrinter(options);
}

export function getProgressBar(options={}) {
    return new ProgressBar('downloading [:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: options.width || 20,
        total: options.total
    });
}
