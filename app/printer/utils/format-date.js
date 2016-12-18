import { padNumberStart } from './pad-number-start';

export function formatDate(date) {
    const year  = date.getFullYear();
    const month = padNumberStart(date.getMonth() + 1, 2, '0');
    const day   = padNumberStart(date.getDate(),      2, '0');

    return `${year}/${month}/${day}`;
}
