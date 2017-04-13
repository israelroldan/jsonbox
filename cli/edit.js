const jsonbox = require('../');

const switchit = require('switchit');
const Command = switchit.Command;
const Type = switchit.Type;

class edit extends Command {
    beforeExecute (params) {
        if (params.set.length > 0) {
            let transform = {};
            params.set.forEach(p => {
                let equals = p.indexOf('=');
                if (equals < 0) {
                    throw new Error(`Invalid assignment (should be key=value): ${p}`);
                }
                let value = p.slice(equals+1);
                if (value === 'null') {
                    value = null;
                } else if (value === '\\null') {
                    value = 'null';
                } else if (value === '{}') {
                    value = {}
                } else if (value === '\\{}') {
                    value = '{}'
                } else if (value === '[]') {
                    value = [];
                } else if (value === '\\[]') {
                    value = '[]';
                }
                transform[p.slice(0, equals)] = value;
            });
            params.toset = unflatten(transform);
        }
    }
    execute (params) {
        const me = this;
        const root = this.root();
        const logger = root.getLogger();
        const config = root.getConfig();
        if (params.interactive) {
            logger.warn("Interactive mode not yet supported 😞");
        } else {
            config.set('env.data',
                new jsonbox(config.get('env.data'))
                    .set(params.toset)
                    .remove(params.remove)
                );
        }
    }
}

edit.define({
    help: 'apply transformations to the json data',
    switches: '[interactive:boolean=false] [set:string[]] [remove:string[]]'
});

module.exports = edit;