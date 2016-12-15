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
            data.episodes = result.rss.channel.item.map(parseItem);

            resolve(data);
        });
    }
}

function parseItem(item) {
    return {
        title: item.title,
        description: item.description,
        pubDate: new Date(item.pubDate),
        enclosure: item.enclosure
    };
}
