const expect = require('assertly').expect;
const jsonbox = require('../../jsonbox');

describe('properties', function () {
    it('should allow loading a property file into a json', function () {
        expect(jsonbox.fromPropertiesFile('test/fixture/foo.properties').build()).to.equal({
            website: 'http://en.wikipedia.org/',
            language: 'English',
            message: 'Welcome to Wikipedia!',
            'key with spaces': 'This is the value that could be looked up with the key "key with spaces".',
            tab: '\t',
            foo: {
                bar: '"abc"',
                baz: '"def"',
                xyz: 'true'
            },
            a: {
                b: 'c'
            }
        });
    });
});

/*
const jsonbox = require('..');

console.log(new jsonbox({foo: "bar"}).set({'baz':'abc'}).toString());
console.log(jsonbox.fromPropertiesFile('./fixture/foo.properties').toString());

*/