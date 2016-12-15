import yargs from 'yargs';

import * as addCommand      from './commands/add';
import * as listCommand     from './commands/list';
import * as removeCommand   from './commands/remove';
import * as updateCommand   from './commands/update';

yargs
    .usage('Usage: $0 <command> [arguments]')
    .command(addCommand)
    .command(listCommand)
    .command(removeCommand)
    .command(updateCommand)
    .demand(1)
    .argv;
