const expect = require('assertly').expect;
const jsonbox = require('../../jsonbox');

describe('set', function () {
  it('should receive an object with properties to set', function () {
    expect(new jsonbox({ foo: 'bar' }).set({
      baz: 'abc'
    }).build()).to.equal({
      foo: 'bar',
      baz: 'abc'
    });
  });
  it('should override properties from the argument object', function () {
    expect(new jsonbox({ foo: 'bar' }).set({
      foo: 'abc'
    }).build()).to.equal({
      foo: 'abc'
    });
  });
  it('should deeply assign propertis', function () {
    expect(new jsonbox({
      foo: {
        json: 'box'
      }
    }).set({
      foo: {
        bar: {
          abc: 'def'
        }
      }
    }).build()).to.equal({
      foo: {
        json: 'box',
        bar: {
          abc: 'def'
        }
      }
    });
  });
  it('should respect properties with dots in their name', function () {
    expect(new jsonbox({
      foo: {
        baz: 'bar'
      }
    }).set({
      'foo.baz': 'abc'
    }).build()).to.equal({
      foo: {
        baz: 'bar'
      },
      'foo.baz': 'abc'
    });
  });
});
/*
const jsonbox = require('..');

console.log(new jsonbox({foo: "bar"}).set({'baz':'abc'}).toString());
console.log(jsonbox.fromPropertiesFile('./fixture/foo.properties').toString());

*/