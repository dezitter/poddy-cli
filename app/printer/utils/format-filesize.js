import { padNumberStart } from './pad-number-start';

export function formatFilesize(filesize) {
    let filesizeStr = '???';

    if (filesize) {
        let sizeInMb = Math.round(filesize / (1024 * 1024));
        filesizeStr = padNumberStart(sizeInMb, 3, ' ');
    }

    return `${filesizeStr}MB`;
}
