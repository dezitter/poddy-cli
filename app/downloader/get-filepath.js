import path from 'path';
import url from 'url';

function getFilename(episode) {
    return path.basename(
        url.parse(episode.enclosure.url).pathname
    );
}

export function getFilepath(root, podcast, episode) {
    const filename = getFilename(episode);

    return path.join(root, podcast.name, filename);
}
