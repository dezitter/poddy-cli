// see https://github.com/dthree/vorpal/issues/134
export default function clearCommand(vorpal) {
    return vorpal
        .command('clear')
        .description('Clear the screen')
        .action(function(args, cb) {
            this.log('\u001b[2J\u001b[0;0H');
            cb();
        });
}
