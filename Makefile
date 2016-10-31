synopsis=./bin/cmd.js

pass:
	@cat test/fixtures/pass.tap | ${synopsis}

fail:
	@cat test/fixtures/fail.tap | ${synopsis}

none:
	@echo ' ' | ${synopsis}
