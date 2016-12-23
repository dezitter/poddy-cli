import chalk from 'chalk';

export function highlightWord(text, word) {
    const index = text.toLowerCase().indexOf( word.toLowerCase() );

    if (index !== -1) {
        text = text.substring(0, index)
             + chalk.red( text.substring(index, index + word.length) )
             + text.substring(index + word.length);
    }

    return text;
}
