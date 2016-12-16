* [x] differentiate between podcast (name/url) & feed (podcast resource)

* [x] update command: print 'Successfully updated' with episode count only

* [ ] add a commands/utils/index module to regroup utilities

* [x] list command: add optional [name] argument
* [x] list command: print episodes list
 * [x] list command: add a --limit option
 * [x] list command: adjust title to consistent width
 * [x] list command: pad episode number (0-pad)
 * [x] list command: truncate title

* [x] store update result in store with 'syncedAt' timestamp
* [ ] when fetching
 - store etag if in headers
 - use etag || if-Modified-Since to save fetching of full feed if not changed
 - when updating, differentiate between not modified & updated

* [ ] add npm build && npm start scripts
