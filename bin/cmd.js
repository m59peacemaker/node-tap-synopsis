#!/usr/bin/env node

const {obj: through} = require('throo')
const formSynopsis = require('tap-form-synopsis')
const synopsis = require('../')

process.stdin
  .pipe(formSynopsis())
  .pipe(through((push, synopsis, enc, cb) => {
    if (synopsis.failed.length) {
      process.on('exit', () => process.exit(1))
    }
    push(synopsis)
    cb()
  }))
  .pipe(synopsis.styled())
  .pipe(process.stdout)
