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
const logger = new Logger();

export function getStore() {
    return store;
}

export function getLogger() {
    return logger;
}

export function getDownloader(podcast) {
    return new Downloader(podcast, { directory: downloadDirectory });
}

export function getListPrinter(options) {
    options = Object.assign({ logger }, options);
    return new ListPrinter(options);
}

export function getSearchPrinter(options) {
    options = Object.assign({ logger }, options);
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
