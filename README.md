# jsonbox 📦

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Library and CLI to transform JSON files

If you have worked with Javascript and JSON at all, you inevitable have been in the position where you need to apply a bunch of transformations to a particular json file (or object read from one).

Commonly, this is how this is done (programatically):

    let myObj = require('./some/file.json');
    myObj.foo = 'bar';
    myObj.test = {
        abc: true
    };
    delete myObj.baz;
    fs.writeFileSync(myObj);

And there's no out-of-the-box way to do this in the command line (for quick manipulation of json files).  
`jsonbox` provides a cleaner syntax:

    jsonbox.load('./some/file.json').set({
        foo: 'bar',
        test: {
            abc: true
        }
    }).remove('baz').save();

And this can even be done directly from the command line!

    $ jsonbox open ./some/file.json \
        edit \
            --set foo=bar \
            --set test={abc: true} \
            --remove baz
        write

## Table of Contents

- [Install](#install)
- [Contribute](#contribute)
- [License](#license)

## Install

`jsonbox` is both an API library and a command-line application.  

To use `jsonbox` in your project, add as a dependency:
```
npm install --save jsonbox
```
To use as a command-line application (recommended globally):
```
npm install -g jsonbox-cli
```

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © Israel Roldan (github@israelroldan.com)
