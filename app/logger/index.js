/* eslint no-console: ["error", { allow: ["log"] }] */

import chalk from 'chalk';
import { highlightWords } from './highlight-words';

const _log = console.log.bind(console);

export default class Logger {

    error(err) {
        const level = chalk.red.bold('ERROR');
        _log(`${level} ${err.message}`);
    }

    info(msg) {
        const level = chalk.blue.bold('INFO');
        _log(`${level} ${msg}`);
    }

    header(msg) {
        _log(chalk.bold(msg));
    }

    log(msg) {
        _log(msg);
    }

    highlight(msg, words) {
        let highLightedMsg = highlightWords(msg, words);
        _log(highLightedMsg);

    }

    success(msg) {
        const level = chalk.green.bold('SUCCESS');
        _log(`${level} ${msg}`);
    }

    warning(msg) {
        const level = chalk.yellow.bold('WARNING');
        _log(`${level} ${msg}`);
    }
}
