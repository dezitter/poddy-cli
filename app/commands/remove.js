import * as provider from '../provider';
import { onError } from './utils/on-error';

function handler(args) {
    const name = args.name;
    const store = provider.getStore();
    const logger = provider.getLogger(this.log.bind(this));

    return store.remove(name)
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

export default function removeCommand(vorpal) {
    return vorpal
        .command('remove <name>')
        .description('Remove a podcast')
        .action(handler);
}
