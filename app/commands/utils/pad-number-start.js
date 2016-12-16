export function padNumberStart(x, length, fillStr=' ') {
    return x.toString()
        .padStart(length, fillStr);
}
