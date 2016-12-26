import chalk from 'chalk';
import { highlightWords } from './highlight-words';

export default class Logger {

    constructor(log) {
        this._log = log;
    }

    error(err) {
        const level = chalk.red.bold('ERROR');
        this.log(`${level} ${err.message}`);
    }

    info(msg) {
        const level = chalk.blue.bold('INFO');
        this.log(`${level} ${msg}`);
    }

    header(msg) {
        this.log(chalk.bold(msg));
    }

    log(msg) {
        this._log(msg);
    }

    highlight(msg, words) {
        let highLightedMsg = highlightWords(msg, words);
        this.log(highLightedMsg);

    }

    success(msg) {
        const level = chalk.green.bold('SUCCESS');
        this.log(`${level} ${msg}`);
    }

    warning(msg) {
        const level = chalk.yellow.bold('WARNING');
        this.log(`${level} ${msg}`);
    }
}
