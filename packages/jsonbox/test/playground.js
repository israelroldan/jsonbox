const jsonbox = require('..');

console.log(new jsonbox({foo: "bar"}).set({'baz':'abc'}).toString());
console.log(jsonbox.fromPropertiesFile('./fixture/foo.properties').toString());