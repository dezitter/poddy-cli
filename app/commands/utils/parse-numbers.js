const NUMBERS_REGEX = /^\d+(?:,\d+-\d+|-\d+(?!-)|,\d+)*$/;
const RANGE_REGEX = /(\d+)-(\d+)/;

function range(start, end) {
    const length = (end - start) + 1;

    return (new Array(length))
        .fill(start)
        .map((v,i) => v + i);
}

function parseRange(str) {
    const match = str.match(RANGE_REGEX);
    const start = parseInt(match[1], 10);
    const end   = parseInt(match[2], 10);

    if (end <= start) {
        throw new Error(`One range in "${str}" is invalid`);
    }

    return range(start, end);
}

function parseToken(token) {
   if (RANGE_REGEX.test(token)) {
       return parseRange(token);
   } else {
       return [parseInt(token, 10)];
   }
}

export function parseNumbers(str) {
    let numbers = [];

    str = str.replace(/ /g, '');

    if (!NUMBERS_REGEX.test(str)) {
        throw new Error(`${str} is not a valid expression`);
    }

    str.split(',')
       .forEach(token => {
           const values = parseToken(token);
           numbers.push.apply(numbers, values);
       });

    return numbers;
}
