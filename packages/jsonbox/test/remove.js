const expect = require('assertly').expect;
const jsonbox = require('../../jsonbox');

describe('remove', function () {
    it('should remove properties based on an array of property names', function () {
        expect(new jsonbox({
            foo: {
                bar: 'baz'
            },
            abc: 'def'
        }).remove([
            'abc'
        ]).build()).to.equal({
            foo: {
                bar: 'baz'
            }
        });
    });

    it('should remove properties deeply based on an array of property names', function () {
        expect(new jsonbox({
            foo: {
                bar: 'baz'
            },
            abc: 'def'
        }).remove([
            'foo.bar'
        ]).build()).to.equal({
            foo: {
            },
            abc: 'def'
        });
    });

    it('should remove properties with dots if they exist as such', function () {
        expect(new jsonbox({
            foo: {
                bar: 'baz'
            },
            'abc.xyz': 'def'
        }).remove([
            'abc.xyz'
        ]).build()).to.equal({
            foo: {
                bar: 'baz'
            }
        });
    });

    it('should remove properties with dots if they exist as such even if non-dotted structures match', function () {
        expect(new jsonbox({
            foo: {
                bar: 'baz'
            },
            'foo.bar': 'def'
        }).remove([
            'foo.bar'
        ]).build()).to.equal({
            foo: {
                bar: 'baz'
            }
        });
    });

    it('should resist being asked to remove a property that doesn\'t exist', function () {
        expect(new jsonbox({
            foo: {
                bar: 'baz'
            },
            abc: 'def'
        }).remove([
            'xyz'
        ]).build()).to.equal({
            foo: {
                bar: 'baz'
            },
            abc: 'def'
        });
        expect(new jsonbox({
            foo: {
                bar: 'baz'
            },
            abc: 'def'
        }).remove([
            'def.xyz'
        ]).build()).to.equal({
            foo: {
                bar: 'baz'
            },
            abc: 'def'
        });
    });

    it('should not flatten things when removing', function () {
        let obj = new jsonbox({
            name: 'something',
            dependencies: {
                'foo.bar': '1.2.3',
                'foo.baz': '1.2.4',
                'bar': '1.2.3'
            },
            foo: 'abc'
        });
        expect(obj.remove(['foo']).build()).to.equal({
            name: 'something',
            dependencies: {
                'foo.bar': '1.2.3',
                'foo.baz': '1.2.4',
                'bar': '1.2.3'
            }
        });
        expect(obj.remove(['dependencies.foo.baz']).build()).to.equal({
            name: 'something',
            dependencies: {
                'foo.bar': '1.2.3',
                'bar': '1.2.3'
            }
        });
    });
});
/*
const jsonbox = require('..');

console.log(new jsonbox({foo: "bar"}).set({'baz':'abc'}).toString());
console.log(jsonbox.fromPropertiesFile('./fixture/foo.properties').toString());

*/