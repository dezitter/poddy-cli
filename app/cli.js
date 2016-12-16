import yargs from 'yargs';

import * as addCommand      from './commands/add';
import * as downloadCommand from './commands/download';
import * as listCommand     from './commands/list';
import * as removeCommand   from './commands/remove';
import * as updateCommand   from './commands/update';

yargs
    .usage('Usage: $0 <command> [arguments]')
    .command(addCommand)
    .command(downloadCommand)
    .command(listCommand)
    .command(removeCommand)
    .command(updateCommand)
    .demand(1)
    .strict()
    .help()
    .argv;
