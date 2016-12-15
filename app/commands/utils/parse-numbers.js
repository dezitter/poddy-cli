const NUMBERS_REGEX = /^\d+(?:,\d+-\d+|-\d+(?!-)|,\d+)*$/;
const RANGE_REGEX = /(\d+)-(\d+)/;

function range(start, end) {
    const length = (end - start) + 1;

    return (new Array(length))
        .fill(start)
        .map((v,i) => v + i);
}

export function parseNumbers(str) {
    let numbers = [];

    str = str.replace(/ /g, '');

    if (!NUMBERS_REGEX.test(str)) {
        throw new Error(`${str} is not a valid expression`);
    }

    str.replace(/ /g, '')
       .split(',')
       .forEach(v => {
           if (RANGE_REGEX.test(v)) {
               const match = v.match(RANGE_REGEX);
               const start = parseInt(match[1], 10);
               const end   = parseInt(match[2], 10);

               if (end <= start) {
                   throw new Error(`One range in "${str}" is invalid`);
               }

               numbers.push.apply(numbers, range(start, end));
           } else {
               numbers.push( parseInt(v, 10) );
           }
       });

    return numbers;
}
