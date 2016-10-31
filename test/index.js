const test = require('tape')
const {spawn} = require('child_process')
const {join: joinPath} = require('path')
const fs = require('fs')
const synopsis = require('../')

test('exitCode 0 when all tests pass', t => {
  t.plan(1)
  const p = spawn(require.resolve('../bin/cmd'))
  fs.createReadStream(joinPath(__dirname, 'fixtures/pass.tap'))
    .pipe(p.stdin)
  p.on('close', exitCode => t.equal(exitCode, 0))
})

test('exitCode 1 if any tests fail', t => {
  t.plan(1)
  const p = spawn(require.resolve('../bin/cmd'))
  fs.createReadStream(joinPath(__dirname, 'fixtures/fail.tap'))
    .pipe(p.stdin)
  p.on('close', exitCode => t.equal(exitCode, 1))
})

test('stream API', t => {
  t.plan(1)
  const stream = synopsis()
  let summary = ''
  stream.on('data', d => (summary += d))
  stream.on('end', () => t.true(/total/.test(summary), summary))
  stream.write('ok 1\n')
  stream.end()
})
