/* eslint no-console: ["error", { allow: ["error"] }] */

import * as provider from '../../provider';

function isDevelopment() {
    const env = process.env.NODE_ENV;

    return (env === 'dev')
    ||     (env === 'development');
}

export function onError(err) {
    provider
        .getLogger()
        .error(err);

    if (isDevelopment()) console.error(err);
}
