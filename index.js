const format = require('chalk')
const symbols = require('figures')
const {obj: through} = require('throo')
const duplex = require('duplexer')
const formSynopsis = require('tap-form-synopsis')

const display = () => through((push, synopsis, enc, cb) => {
  if (synopsis.tests === 0) {
    push(format.red(symbols.cross + ' No tests found') + '\n')
  } else {
    push(`total:    ${synopsis.tests}\n`)
    push(format.green(`passing:  ${synopsis.passed.length}\n`))
    if (synopsis.failed.length) {
      push(format.red(`failing:  ${synopsis.failed.length}\n`))
    }
    push(`duration: ${synopsis.time.total}ms\n`)
  }
  cb()
})

const synopsis = () => {
  const formSynopsisStream = formSynopsis()
  const displayStream = formSynopsisStream
    .pipe(display())
  return duplex(formSynopsisStream, displayStream)
}

synopsis.display = display

module.exports = synopsis
