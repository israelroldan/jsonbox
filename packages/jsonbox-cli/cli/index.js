const getStdin = require('get-stdin');
const JSON = require('json5');
const path = require('path');
const switchit = require('switchit');

const Config = require('./utils/config');
const log = require('./utils/log');

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
            logger.info('cli version:', config.get('jsonbox-cli.pkg.version'));
            logger.info('lib version:', config.get('jsonbox.pkg.version'));
        } else {
            if (params['ignore-stdin']){
                return super.execute(params, args);
            } else {
                return getStdin().then(str => {
                    try {
                        config.set('env.data', JSON.parse(str));
                    } catch (ignore) {
                        // either can't read from stdin or something wrong happened
                    }
                    return super.execute(params, args);
                });
            }
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
cfg.load(path.join(__dirname, '../package.json'), 'jsonbox-cli.pkg');
cfg.load(path.join(require.resolve('jsonbox'), '..', 'package.json'), 'jsonbox.pkg');

jsonbox.define({
    help: {
        '': cfg.get('jsonbox.pkg.description'),
        'ignore-stdin': 'Ignore stdin',
        version: 'Show version info'
    },
    commands: {
        create: create,
        edit: edit,
        open: open,
        show: show,
        write: write,
        get: get
    },
    switches: '[s#ignore-stdin:boolean=false] [version:boolean=false]',
    log: log,
    config: cfg
});

module.exports = jsonbox;