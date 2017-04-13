#!/usr/bin/env node

const jsonbox = require('./cli');

new jsonbox()
    .run(process.argv.slice(2))
    .catch((err) => {
        if (err.message) {
            jsonbox.log.error(err.message);
        } else {
            jsonbox.log.error(err);
        }
        process.exit(1);
    });