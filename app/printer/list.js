import BasePrinter from './base';

export default class ListPrinter extends BasePrinter{

    constructor(options) {
        super(options);
        this.nameOnly = options.nameOnly;
    }

    showOnePodcast(podcast) {
        if (this.nameOnly) {
            this._printPodcast(podcast);
        } else {
            super.showOnePodcast(podcast);
        }
    }
}
