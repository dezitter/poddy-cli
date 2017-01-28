import { ellipsize } from '../../utils/ellipsize';

export function formatTitle(title) {
    const titleWidth = 80;

    return ellipsize(title, titleWidth)
        .padEnd(titleWidth);
}

