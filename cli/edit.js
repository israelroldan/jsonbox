const switchit = require('switchit');
const Command = switchit.Command;
const Type = switchit.Type;

const assignment = require('assignment');
const escapeStringRegexp = require('escape-string-regexp');
const flatten = require('flat');
const unflatten = flatten.unflatten;

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
            params.toset = transform;
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
            var data = config.get('env.data');
            assignment(data, unflatten(params.toset));
            if (params.remove) {
                data = flatten(data);
                params.remove.forEach((r) => {
                    let regex = new RegExp(`${escapeStringRegexp(r)}(\\.|$)`);
                    Object.keys(data).forEach((k) => {
                        if (regex.test(k)) {
                            delete data[k];
                        }
                    });
                });
                data = unflatten(data);
            }
            config.set('env.data', data);
        }
    }
}

edit.define({
    help: 'apply transformations to the json data',
    switches: '[interactive:boolean=false] [set:string[]] [remove:string[]]'
});

module.exports = edit;