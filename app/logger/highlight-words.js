import { highlightWord } from './highlight-word';

export function highlightWords(text, words) {
    let hlText = text;

    words.forEach(word => {
        hlText = highlightWord(hlText, word);
    });

    return hlText;
}
