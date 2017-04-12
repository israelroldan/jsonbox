const Command = require('switchit').Command;

class create extends Command {
    execute () {
        this.root().getConfig().set('env.data', {});
    }
}

create.define({
    help: 'Create a new json object'
});

module.exports = create;