import chalk from 'chalk';

const _log = console.log.bind(console);
const _error = console.error.bind(console);

export default class Logger {

    constructor(options) {
        this.env = options.env;
    }

    error(err) {
        const level = chalk.red.bold('ERROR');
        _log(`${level} ${err.message}`);

        if (this.env === 'dev' || this.env === 'development') {
            _error(err);
        }
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

    success(msg) {
        const level = chalk.green.bold('SUCCESS');
        _log(`${level} ${msg}`);
    }

    warning(msg) {
        const level = chalk.yellow.bold('WARNING');
        _log(`${level} ${msg}`);
    }
}
