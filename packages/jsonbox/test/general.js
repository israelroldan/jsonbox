const expect = require('assertly').expect;
const jsonbox = require('../../jsonbox');

describe('nest', function () {
    it('should allow nesting the whole object inside other property', function () {
        expect(new jsonbox({ foo: 'bar' }).nest('abc').build()).to.equal({
          abc: {
            foo: 'bar'
          }
        });
    });
});

describe('toString', function () {
    it('should provide a toString method', function () {
        expect(new jsonbox({ foo: 'bar' }).toString).to.not.be.empty();
        expect(new jsonbox({ foo: 'bar' }).toString()).to.not.be.empty();
        expect(new jsonbox({ foo: 'bar' }).toString()).to.be.a('string');

        expect(new jsonbox({ foo: 'bar' }).toString()).to.equal(
`{
  "foo": "bar"
}`
        );
    });

    it('should provide a way to specify the indentation level', function () {
        expect(new jsonbox({ foo: 'bar' }).toString(4)).to.equal(
`{
    "foo": "bar"
}`
        );
    });
});
/*
const jsonbox = require('..');

console.log(new jsonbox({foo: "bar"}).set({'baz':'abc'}).toString());
console.log(jsonbox.fromPropertiesFile('./fixture/foo.properties').toString());

*/