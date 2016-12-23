import BasePrinter from './base';

export default class ListPrinter extends BasePrinter{

    constructor(options) {
        super(options);
        this.nameOnly = options.nameOnly;
    }

    showOnePodcast(podcast) {
        if (this.nameOnly) {
            const message = this._formatPodcast(podcast);
            this.logger.header(message);
        } else {
            super.showOnePodcast(podcast);
        }
    }
}
