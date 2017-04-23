var logSymbols = require('log-symbols');

const levels = [{
    name: 'error',
    original: 'error',
    prefix: logSymbols.error,
    alias: [
        'err',
        'e'
    ]
},{
    name: 'warn',
    original: 'log',
    prefix: logSymbols.warning,
    alias: [
        'warn',
        'w'
    ]
},{
    name: 'info',
    original: 'log',
    prefix: logSymbols.info,
    alias: [
        'i',
        'debug',
        'd'
    ]
}, {
    name: 'success',
    original: 'log',
    prefix: logSymbols.success,
    alias: [
        's'
    ]
},{
    name: '',
    original: 'log',
    alias: [
        'log'
    ]
}];

levels.forEach(level => {
    if (level.name === '') {
        module.exports = function () {
            console[level.original].apply(null, [].slice.call(arguments));
        }
    }
});

levels.forEach(level => {
    if (level.name !== '' || level.alias) {
        var fn = function () {
            var args = [].slice.call(arguments);
            if (level.prefix) {
                args.unshift(level.prefix);
            }
            console[level.original].apply(null, args);
        }
        if (level.name !== '') {
            module.exports[level.name] = fn;
        }
        if (level.alias) {
            level.alias.forEach(a => {
                module.exports[a] = fn;
            })
        }
    }
});