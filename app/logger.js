import chalk from 'chalk';

const _log = console.log.bind(console);
const _error = console.error.bind(console);

function highlightWordAt(msg, word, index) {
    const hlWord = chalk.red(word);

    return msg.substring(0, index)
         + hlWord
         + msg.substring(index + word.length);
}

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

    highlight(msg, words) {
        let hlMsg = msg;
        const lowerCasedMsg = msg.toLowerCase();

        words.forEach(word => {
            const i = lowerCasedMsg.indexOf(word);

            if (i !== -1) {
                hlMsg = highlightWordAt(hlMsg, word, i);
            }
        });

        _log(hlMsg);

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
