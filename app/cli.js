import Vorpal from 'vorpal';

import addCommand      from './commands/add';
import clearCommand    from './commands/clear';
import downloadCommand from './commands/download';
import listCommand     from './commands/list';
import removeCommand   from './commands/remove';
import searchCommand   from './commands/search';
import updateCommand   from './commands/update';

const vorpal = Vorpal();

vorpal
    .use(addCommand)
    .use(removeCommand)
    .use(listCommand)
    .use(searchCommand)
    .use(updateCommand)
    .use(downloadCommand)
    .use(clearCommand)
    .delimiter('poddy> ')
    .show();
