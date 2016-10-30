const format = require('chalk')
const duplex = require('duplexer')
const {obj: through} = require('throo')
const formSynopsis = require('tap-form-synopsis')

const styled = () => through((push, synopsis, enc, cb) => {
  push(`total:    ${synopsis.tests}\n`)
  push(format.green(`passing:  ${synopsis.passed.length}\n`))
  if (synopsis.failed.length) {
    push(format.red(`failing:  ${synopsis.failed.length}\n`))
  }
  push(`duration: ${synopsis.time.total}ms\n`)
  cb()
})

const synopsis = () => {
  const formSynopsisStream = formSynopsis()
  const synopsisStream = formSynopsisStream
    .pipe(styled())
  return duplex(formSynopsisStream, synopsisStream)
}

synopsis.styled = styled

module.exports = synopsis
