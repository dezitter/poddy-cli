import * as provider from '../../provider';

export function onError(err) {
    provider
        .getLogger()
        .error(err);
}
