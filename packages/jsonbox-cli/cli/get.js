const Command = require('switchit').Command;

class get extends Command {
    beforeExecute (params) {
        if (params.property === '' && params.template === '') {
            throw new Error("At least one of 'property' or 'template' is expected");
        }
        if (params.template !== '') {
            throw new Error('Template mode not yet supported 😞');
        }
    }
    execute (params) {
        var root = this.root();
        var logger = root.getLogger();
        var config = root.getConfig();

        if (!config.has('env.data')) {
            throw new Error('No data loaded');
        }

        let obj = config.get('env.data')[params.property];
        if (!params.raw) {
            let newObj = {};
            newObj[params.property] = obj;
            JSON.stringify(newObj, null, 2).split('\n').forEach(l => logger(l) );
        } else {
            console.log(obj);
        }
         
    }
}

get.define({
    switches: [
        '[r#raw:boolean=false]',
        {
            name: 'template',
            value: '',
            type: 'string'
        }
    ],
    parameters: {
        property: {
            switchy: true,
            value: '',
            type: 'string'
        }
    }
});

module.exports = get;