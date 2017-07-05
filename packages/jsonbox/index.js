const assignment = require('assignment');
const escapeStringRegexp = require('escape-string-regexp');
const unflatten = require('flat').unflatten;

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
        let removeKey = (key, obj) => {
            if (key in obj) {
                delete obj[key];
            } else if (~key.indexOf('.')) {
                let obj2 = obj;
                let first = key.substring(0,key.indexOf('.'));
                if (first in obj) {
                    removeKey(key.slice(key.indexOf('.')+1), obj[first]);
                }
            }
        }
        keys.forEach((k) => removeKey(k,me._data));
        return this;
    }

    build () {
        return this._data;
    }

    toString (indent = 2) {
        return JSON.stringify(this._data, null, indent);
    }

    nest (newRoot) {
        let oldObj = this._data;
        this._data = {};
        this._data[newRoot] = oldObj;
        return this;
    }

    // -----------------------------------------

    static fromPropertiesFile (path) {
        return new Jsonbox(unflatten(require('properties-parser').read(path)));
    }
}

module.exports = Jsonbox;