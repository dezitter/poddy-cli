import chalk from 'chalk';

export function highlightWord(text, word) {
    const hightlightedWord = chalk.red(word);
    const index = text.toLowerCase().indexOf( word.toLowerCase() );

    if (index !== -1) {
        text = text.substring(0, index)
             + hightlightedWord
             + text.substring(index + word.length);
    }

    return text;
}
