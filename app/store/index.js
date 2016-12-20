import _ from 'lodash';

export default class Store {

    constructor(options) {
        this.db = options.db;
    }

    _promisify(callback) {
        return new Promise(executor.bind(this));

        function executor(resolve, reject) {
            callback((err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        }
    }

    add(name, url) {
        return this._promisify(cb => {
            this.db.insert({ name, url, episodes: [] }, cb);
        });
    }

    list() {
        return this._promisify(cb => {
            this.db.find(null)
                   .sort('createdAt', -1)
                   .exec(cb);
        });
    }

    remove(name) {
        return this._promisify(cb => {
            this.db.remove({ name }, cb);
        });
    }

    find(name) {
        return this._promisify(cb => {
            this.db.findOne({ name }, cb);
        })
        .then(onResolve);

        function onResolve(podcast) {
            if (podcast === null) {
                throw new Error(`Podcast "${name}" does not exist`);
            }
            return podcast;
        }
    }

    update(name, patch) {
        return this.find(name)
                   .then(onFindResolve.bind(this));

        function onFindResolve(podcast) {
            return this._promisify(updateQuery.bind(this));

            function updateQuery(cb) {
                const query = { name };
                const dbPatch = buildUpdatePatch(patch);
                // MongoDB incompatible, but could use collection#findAndModify
                const options = { returnUpdatedDocs: true };

                this.db.update(query, dbPatch, options, (err, num, docs) => cb(err, docs));
            }

            function buildUpdatePatch() {
                const episodes = patch.episodes.filter(byPubDate);

                return {
                    $set: _.omit(patch, 'episodes'),
                    $push: { episodes: { $each: episodes } }
                };
            }

            function byPubDate(episode) {
                const wasSynced = (podcast.cache !== undefined);
                const syncedAt = (wasSynced && podcast.cache.syncedAt) || null;

                return !wasSynced
                ||     (syncedAt < episode.pubDate);
            }
        }
    }
}
