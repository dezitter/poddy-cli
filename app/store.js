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
            this.db.insert({ name, url }, cb);
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
        });
    }

    update(feed, patch) {
        return this._promisify(cb => {
            this.db.update({ _id: feed._id }, { $set: patch }, cb);
        })
        .then(() => this.find(feed.name));

    }
}
