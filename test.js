var co = require('co')

var pswd = require('./')()

describe('pswd', function () {
  it('should hash a password', co(function* () {
    var hash = yield* pswd.hash('password')
    hash.split(';').length.should.equal(4)
  }))

  it('should compare a password', co(function* () {
    var hash = yield* pswd.hash('password')
    var okay = yield* pswd.compare('password', hash)
    okay.should.be.ok
  }))

  it('should reject an incorrect password', co(function* () {
    var hash = yield* pswd.hash('password')
    var okay = yield* pswd.compare('asdfadfs', hash)
    okay.should.not.be.ok
  }))

  it('should work when you change iterations', co(function* () {
    var hash = yield* pswd.hash('password')
    pswd.iterations = 13000
    var okay = yield* pswd.compare('password', hash)
    okay.should.be.ok
  }))

  it('should work when you change length', co(function* () {
    var hash = yield* pswd.hash('password')
    pswd.length = 64
    var okay = yield* pswd.compare('password', hash)
    okay.should.be.ok
  }))
})