const getStdin = require('get-stdin');
const switchit = require('switchit');

const Config = require('./utils/config');
const log = require('./utils/log');

const path = require('path');

const create = require('./create');
const edit = require('./edit');
const get = require('./get');
const open = require('./open');
const show = require('./show');
const write = require('./write');

class jsonbox extends switchit.Container {
    execute (params, args) {
        const me = this;
        const config = me.getConfig();
        const logger = me.getLogger();
        if (params.version) {
            logger.info('version:', config.get('jsonbox.pkg.version'));            
        } else {
            return getStdin().then(str => {
                try {
                    config.set('env.data', JSON.parse(str));
                } catch (ignore) {}
                return super.execute(params, args);
            });
        }
    }
    getLogger () {
        return this.constructor.log;
    }
    getConfig () {
        return this.constructor.config;
    }
}

const cfg = new Config();
cfg.load(path.join(__dirname, '../package.json'), 'jsonbox.pkg');

jsonbox.define({
    help: {
        '': cfg.get('jsonbox.pkg.description'),
        stdin: 'Read from stdin',
        version: 'Show version info'
    },
    commands: {
        create: create,
        edit: edit,
        help: switchit.commands.Help,
        open: open,
        show: show,
        write: write,
        get: get
    },
    switches: '[s#stdin:boolean=false] [version:boolean=false]',
    log: log,
    config: cfg
});

module.exports = jsonbox;