import xml2js from 'xml2js';

export function parseResponse(response) {
    return new Promise(executor);

    function executor(resolve, reject) {
        const data = {};
        const xml2jsOptions = {
            mergeAttrs: true,
            explicitArray: false
        };

        if (!response) return reject(new Error('Missing xml feed'));

        xml2js.parseString(response, xml2jsOptions, (err, result) => {
            if (err) return reject(err);

            data.title = result.rss.channel.title;
            data.episodes = result.rss.channel.item.map((item, i) => {
                return Object.assign({ number: i+1, }, parseItem(item));
            });

            resolve(data);
        });
    }
}

function parseItem(item) {
    const duration = item['itunes:duration'];

    return {
        duration: duration && duration.trim(),
        enclosure: item.enclosure,
        guid: item.guid,
        pubDate: new Date(item.pubDate),
        title: item.title.trim()
    };
}
