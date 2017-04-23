const fs = require('fs');
const flatten = require('flat');

class Config {
    get (key) {
        return this._rawData[key];
    }

    set (key, value) {
        this._rawData[key] = value;
        if (!this.has(key)) {
            this._keys.push(key);
        }
        return this;
    }

    has (key) {
        return this._keys.indexOf(key) > -1;
    }

    setNew (key, value) {
        if (!this.has(key)) {
            this.set(key, value);
            return true;
        }
        return false;
    }

    clear () {
        this._rawData = {};
        this._keys = [];
        return this;
    }

    load (file, prefix = '') {
        const me = this;
        if (fs.existsSync(file)) {
            // TODO: Support more file extensionst
            if (file.endsWith('.json')) {
                var data = flatten(require(file));
                Object.keys(data).forEach(key => {
                    // setNew or set? 
                    me.setNew(`${prefix ? prefix + '.' : '' }${key}`, data[key]);
                });
            }
        }
    }
}

Config.prototype._keys = [];
Config.prototype._rawData = {};

module.exports = Config;