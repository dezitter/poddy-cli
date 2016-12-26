import Vorpal from 'vorpal';

import addCommand      from './commands/add';
import downloadCommand from './commands/download';
import listCommand     from './commands/list';
import removeCommand   from './commands/remove';
import searchCommand   from './commands/search';
import updateCommand   from './commands/update';

const vorpal = Vorpal();

vorpal
    .use(addCommand)
    .use(downloadCommand)
    .use(listCommand)
    .use(removeCommand)
    .use(searchCommand)
    .use(updateCommand)
    .delimiter('poddy> ')
    .show();
