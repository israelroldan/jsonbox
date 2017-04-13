const assignment = require('assignment');
const escapeStringRegexp = require('escape-string-regexp');
const flatten = require('flat');
const unflatten = flatten.unflatten;

class Jsonbox {
    constructor (obj) {
        this._data = obj;
    }

    set (obj) {
        assignment(this._data, obj);
        return this;
    }

    remove (keys) {
        let me = this;
        me._data = flatten(me._data);
        keys.forEach((r) => {
            let regex = new RegExp(`${escapeStringRegexp(r)}(\\.|$)`);
            Object.keys(me._data).forEach((k) => {
                if (regex.test(k)) {
                    delete me._data[k];
                }
            });
        });
        me._data = unflatten(me._data);
        return this;
    }

    build () {
        return this._data;
    }

    toString (indent = 2) {
        return JSON.stringify(this._data, null, indent);
    }
}

module.exports = Jsonbox;