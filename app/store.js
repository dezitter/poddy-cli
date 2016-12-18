export default class Store {

    constructor(options) {
        this.db = options.db;
    }

    _promisify(operation) {
        return new Promise(executor.bind(this));

        function executor(resolve, reject) {
            operation((err, result) => {
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

    update(podcast, patch) {
        return this._promisify(cb => {
            this.db.update({ _id: podcast._id }, { $set: patch }, cb);
        })
        .then(() => this.find(podcast.name));

    }
}
