# pswd [![Build Status](https://travis-ci.org/cojs/pswd.png)](https://travis-ci.org/cojs/pswd)

Similar to [pwd](https://github.com/visionmedia/node-pwd). Designed with generators for cleaner code. Also, pwd doesn't actually work with generators, and I'm too lazy to fix it. bcrypt also doesn't support node 0.11 yet :(

- Supports passwords with different iterations and lengths
- Returns a single string like bcrypt

## API

### var pswd = require('pswd')([options])

These options can also be set and changed by doing `pswd[option] = Integer`.

- `length` <128> - salt and `pbkdf2` byte length
- `iterations` <12000> - `pbkdf2` iteration count

### var hash = yield* pswd.hash(password, [salt], [iterations], [length])

Creates a hash from the password with optional `salt`, `iterations`, and `length` arguments (used for comparision).

### var okay = yield* pswd.compare(password, hash)

Compare a password with a hash. `okay` is a `Boolean`.

## License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.