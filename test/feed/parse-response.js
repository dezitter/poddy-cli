/* global beforeEach, describe, it */

import fs from 'fs';
import path from 'path';
import { expect } from 'chai';

import { parseResponse } from 'app/feed/parse-response';

function readTestFeed(done) {
    const options = { encoding: 'utf8' };
    const xmlFilePath = path.join(__dirname, '..', 'feed.xml');

    fs.readFile(xmlFilePath, options, (err, rawXmlFeed) => {
        if (err) return done(err);

        this.rawXmlFeed = rawXmlFeed;

        done();
    });
}

describe('#parseResponse()', function() {
    beforeEach(readTestFeed);

    describe('when given no argument', function() {
        it('rejects', function() {
            return parseResponse()
                .catch(error => {
                    expect(error).to.be.an('error');
                    expect(error.message).to.equal('Missing xml feed');
                });
        });
    });

    describe('when given an xml feed', function() {
        it('returns a Promise', function() {
            const promise = parseResponse(this.rawXmlFeed);
            expect(promise).to.be.an.instanceof(Promise);
        });

        it('resolves with a JSON object', function() {
            return parseResponse(this.rawXmlFeed)
                .then(result => expect(result).to.be.an('object'));
        });

        it('parses the feed', function() {
            return parseResponse(this.rawXmlFeed)
                .then(result => {
                    expect(result.title).to.equal('Test');
                    expect(result.episodes).to.have.length(3);
                });
        });

        it('parses the episodes', function() {
            const properties = ['title', 'description', 'pubDate', 'enclosure'];

            return parseResponse(this.rawXmlFeed)
                .then(result => {
                    result.episodes.forEach(item => {
                        properties.forEach(prop => {
                            expect(item).to.have.property(prop);
                        })
                    });

                    expect(result.episodes[0].title).to.equal('First item');
                    expect(result.episodes[0].description).to.equal('This is the first item');
                    expect(result.episodes[0].enclosure).to.eql({
                        url: 'http://www.example.com/first.mp3',
                        length: '0',
                        type: 'audio/mpeg'
                    });
                });
        });

        it('parses date as Date instances', function() {
            return parseResponse(this.rawXmlFeed)
                .then(result => {
                    const expectedTs = Date.UTC(2016, 11, 12, 0, 0, 0);

                    expect(result.episodes[0].pubDate).to.be.an.instanceof(Date);
                    expect(result.episodes[0].pubDate.getTime()).to.equal(expectedTs);
                });
        });
    });
});
