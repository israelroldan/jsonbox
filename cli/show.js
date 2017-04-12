const Command = require('switchit').Command;

class show extends Command {
    beforeExecute (params) {
        if (params.stream !== "stdout" && params.stream !== "stderr") {
            throw new Error('Only valid values for \'stream\' are \'stdout\' and \'stderr\'');
        }
    }

    execute (params) {
        var root = this.root();
        var logger = root.getLogger();
        var config = root.getConfig();

        if (!config.has('env.data')) {
            throw new Error('No data loaded');
        }

        JSON.stringify(config.get('env.data'), null, 2).split('\n').forEach(l => logger(l) );
    }
}

show.define({
    help: 'Prints the loaded json to the specified output stream (stdio)',
    switches: '[stream:string=stdout]'
});

module.exports = show;