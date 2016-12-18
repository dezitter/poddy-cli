import { padNumberStart } from './pad-number-start';

export function formatDuration(duration) {
    if (duration) {
        // hh:mm:ss OR mm:ss OR ss
        if (/^\d\d?(:\d\d(:\d\d)?)?$/.test(duration)) {
            return duration.padStart(8, ' ');
        }
        // assume number of seconds
        else if (/\d+/.test(duration)) {
            const hours   = Math.floor(duration / 3600);
            const minutes = Math.floor((duration / 60) - hours * 60);
            const seconds = duration % 60;
            const parts = [hours, minutes, seconds];


            return parts.filter(part => part !== 0)
                        .map(n => padNumberStart(n, 2, '0'))
                        .join(':')
                        .padStart(8);
        }
    }
    return '??:??:??';
}

