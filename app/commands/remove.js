import * as provider from 'app/provider';
import { onError } from './utils/on-error';

export const command = 'remove <name>';
export const describe = 'Remove a podcast';

export function handler(argv) {
    const { name } = argv;
    const store = provider.getStore();
    const logger = provider.getLogger();

    store.remove(name)
         .then(onResolve)
         .catch(onError);

    function onResolve(numRemoved) {
        if (numRemoved === 0) {
            logger.warning(`Could not remove "${name}"`);
        } else {
            logger.success(`"${name}" removed`);
        }
    }
}
