const ELLIPSIS_SUFFIX = '...';

function checkLimit(limit) {
    if (!Number.isInteger(limit)) {
        throw new Error(`"${limit}" is not a valid integer limit`);
    } else if (limit < 0) {
        throw new Error(`The limit must be positive, got ${limit}`);
    }
}

export function ellipsize(str, limit=50) {
    const length = str.length;

    checkLimit(limit);

    if (limit < length) {
        str = str.slice(0, (limit - ELLIPSIS_SUFFIX.length)) + ELLIPSIS_SUFFIX;
    }

    return str;
}
