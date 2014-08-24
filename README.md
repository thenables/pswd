# pswd

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Similar to [pwd](https://github.com/visionmedia/node-pwd).
Designed with promises for cleaner code, especially with generators.
Also, pwd doesn't actually work with generators, and I'm too lazy to fix it.
bcrypt also doesn't support node 0.11 yet :( but not installing C/C++ addons
  to do password hashing is always nice.

- Supports changing passwords with different iterations and lengths
- Returns a single string like bcrypt

## API

### var pswd = require('pswd')([options])

These options can also be set and changed by doing `pswd[option] = Integer`.

- `length` <128> - salt and `pbkdf2` byte length
- `iterations` <12000> - `pbkdf2` iteration count

### pswd.hash(password, [salt], [iterations], [length]).then( hash => )

Creates a hash from the password with optional `salt`, `iterations`, and `length` arguments (used for comparision).

### pswd.compare(password, hash).then( okay => )

Compare a password with a hash. `okay` is a `Boolean`.

[npm-image]: https://img.shields.io/npm/v/pswd.svg?style=flat-square
[npm-url]: https://npmjs.org/package/pswd
[github-tag]: http://img.shields.io/github/tag/thenables/pswd.svg?style=flat-square
[github-url]: https://github.com/thenables/pswd/tags
[travis-image]: https://img.shields.io/travis/thenables/pswd.svg?style=flat-square
[travis-url]: https://travis-ci.org/thenables/pswd
[coveralls-image]: https://img.shields.io/coveralls/thenables/pswd.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/thenables/pswd?branch=master
[david-image]: http://img.shields.io/david/thenables/pswd.svg?style=flat-square
[david-url]: https://david-dm.org/thenables/pswd
[license-image]: http://img.shields.io/npm/l/pswd.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/pswd.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/pswd
[gittip-image]: https://img.shields.io/gittip/jonathanong.svg?style=flat-square
[gittip-url]: https://www.gittip.com/jonathanong/
