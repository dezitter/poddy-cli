import yargs from 'yargs';

import * as addCommand      from './commands/add';
import * as listCommand     from './commands/list';
import * as removeCommand   from './commands/remove';

yargs
    .usage('Usage: $0 <command> [arguments]')
    .command(addCommand)
    .command(listCommand)
    .command(removeCommand)
    .demand(1)
    .argv;
