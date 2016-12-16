* [x] differentiate between podcast (name/url) & feed (podcast resource)

* [x] update command: print 'Successfully updated' with episode count only

* [ ] list command: add optional [name] argument
* [ ] list command: print episodes list
 * [ ] list command: add a --limit option
 * [ ] list command: adjust title to consistent width
 * [ ] list command: pad episode number (0-pad)
 * [ ] list command: truncate title

* [ ] store update result in store with 'syncedAt' timestamp
* [ ] when fetching
 - store etag if in headers
 - use etag || if-Modified-Since to save fetching of full feed if not changed
 - when updating, differentiate between not modified & updated

* [ ] add npm build && npm start scripts
