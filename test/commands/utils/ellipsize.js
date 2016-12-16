/* global describe, it */

import { expect } from 'chai';
import { ellipsize } from '../../../app/commands/utils/ellipsize';

describe('#ellipsize()', function() {

    describe('given an empty string', function() {
        it('returns the empty string', function() {
            const str = ellipsize('');
            expect(str).to.be.empty;
        });
    });

    describe('given a non-empty string', function() {

        describe('when the text is under the limit', function() {
            it('returns the string unaltered', function() {
                const short_string = 'Hello';
                const str = ellipsize(short_string);

                expect(str).to.eql(short_string);
            });
        });

        describe('when the text is over the limit', function() {
            it('returns the string truncated with ellipsis', function() {
                const long_string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
                const str = ellipsize(long_string, 30);

                expect(str).to.eql('Lorem ipsum dolor sit amet,...');
            });
        });
    });

    describe('given a negative limit', function() {
        it('throws an error', function() {
            expect(() => {
                ellipsize('hello', -5);
            }).to.throw('The limit must be positive, got -5');
        });
    });

    describe('given a non-integer limit', function() {
        it('throws an error', function() {
            expect(() => {
                ellipsize('hello', 'abc');
            }).to.throw('"abc" is not a valid integer limit');
        });
    });
});
