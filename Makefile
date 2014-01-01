test:
	@./node_modules/.bin/mocha \
		--harmony-generators \
		--require should \
		--reporter spec

.PHONY: test