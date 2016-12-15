import * as provider from 'app/provider';

export function onError(err) {
    provider
        .getLogger()
        .error(err);
}
