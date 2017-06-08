const fs = require('fs');
const JSON = require('json5');
const path = require('path');

const Command = require('switchit').Command;

class open extends Command {
    execute (params) {
        const root = this.root();
        const config = root.getConfig();
        const logger = root.getLogger();

        try {
            if (config.has('env.data')) {
                logger.debug('Data was previously loaded, overwriting...');
            }
            config.set('env.data', JSON.parse(fs.readFileSync(path.resolve(params.path),'utf8')));
            config.set('env.inputPath', params.path)
        } catch (err) {
            logger.error(err.message);
        }
    }
}

open.define({
    help: {
        '': 'Opens a JSON file',
        path: 'The path to the file to open'
    },
    parameters: '{path:string}'
});

module.exports = open;