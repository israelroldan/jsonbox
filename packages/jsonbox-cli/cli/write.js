const fs = require('fs');
const path = require('path');

const Command = require('switchit').Command;

class write extends Command {
    beforeExecute (params) {
        let me = this;
        let root = this.root();
        let logger = root.getLogger();
        let config = root.getConfig();

        if (config.has('env.inputPath') && !params.outputPath) {
            params.outputPath = config.get('env.inputPath');
        }

        if (params.minify) {
            params.indent = 0;
        }

        super.beforeExecute(params);
    }

    execute (params) {
        var root = this.root();
        var logger = root.getLogger();
        var config = root.getConfig();

        if (!config.has('env.data')) {
            throw new Error('No data loaded');
        }

        fs.writeFileSync(path.resolve(params.outputPath), JSON.stringify(config.get('env.data'), null, params.indent));
    }
}

write.define({
    help: 'Writes the json to the specified output path',
    parameters: '{outputPath:string}',
    switches: '[i#indent:number=2] [e#inPlace:boolean=false] [m#minify:boolean=false]'
});

module.exports = write;