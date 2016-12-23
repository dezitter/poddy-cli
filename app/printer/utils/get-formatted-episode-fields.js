import { formatDate } from './format-date';
import { formatDuration } from './format-duration';
import { formatFilesize } from './format-filesize';
import { formatTitle } from './format-title';
import { padNumberStart } from './pad-number-start';

export function getFormattedEpisodeFields(episode, podcast) {
    const epsNumber = podcast.episodes.length;

    const duration = formatDuration(episode.duration);
    const filesize = formatFilesize(episode.enclosure && episode.enclosure.length);
    const number = padNumberStart(episode.number, epsNumber.toString().length);
    const pubDate = formatDate(episode.pubDate);
    const title = formatTitle(episode.title);

    return { duration, filesize, number, pubDate, title };
}
