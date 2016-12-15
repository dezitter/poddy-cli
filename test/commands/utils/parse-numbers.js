import { expect } from 'chai';
import { parseNumbers } from 'app/commands/utils/parse-numbers';

describe('#parseDownloadNumbers()', function() {

    it('parses a list of numbers', function() {
        let numbers = parseNumbers('1,2,3');
        expect(numbers).to.eql([1,2,3]);
    });

    it('parses a range of numbers', function() {
        let numbers = parseNumbers('1-5');
        expect(numbers).to.eql([1,2,3,4,5]);
    });

    it('parses a list of numbers containing ranges', function() {
        let numbers = parseNumbers('1,2,5-7,11,15-19');
        expect(numbers).to.eql([1,2,5,6,7,11,15,16,17,18,19]);
    });

    it('handles arbitrary spaces', function() {
        let numbers = parseNumbers('1 ,2 ,5 - 7, 11,  15-19   ');
        expect(numbers).to.eql([1,2,5,6,7,11,15,16,17,18,19]);
    });

    describe('when given a malformed expression', function() {
        it('throws an error', function() {
            const invalidExpressions = [
                'a',
                '1,b,4-5,d-h',
                '1,,5',
                '1,5,',
                ',1,5',
                '-1,5',
                '1,5-',
                '1--5',
                '1-2-3-4-5'
            ];

            invalidExpressions.forEach(expression => {
                expect(() => {
                    parseNumbers(expression);
                }).to.throw(
                    Error,
                    `${expression} is not a valid expression`,
                    `"${expression}"`
                );

            });
        });
    });

    describe('when given an invalid range', function() {
        it('throws an error', function() {
            expect(() => {
                parseNumbers('9-2');
            }).to.throw('One range in "9-2" is invalid');
        });
    });
});
