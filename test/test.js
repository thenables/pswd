
var assert = require('assert')

var pswd = require('..')()

describe('pswd', function () {
  it('should hash a password', function () {
    return pswd.hash('password').then(function (hash) {
      assert.equal(4, hash.split(';').length)
    })
  })

  it('should compare a password', function () {
    return pswd.hash('password').then(function (hash) {
      return pswd.compare('password', hash)
    }).then(function (okay) {
      assert(okay)
    })
  })

  it('should reject an incorrect password', function () {
    return pswd.hash('password').then(function (hash) {
      return pswd.compare('lkajlskdjf', hash)
    }).then(function (okay) {
      assert(!okay)
    })
  })

  it('should work when you change iterations', function () {
    return pswd.hash('password').then(function (hash) {
      pswd.iterations = 13000
      return pswd.compare('password', hash)
    }).then(function (okay) {
      assert(okay)
    })
  })

  it('should work when you change length', function () {
    return pswd.hash('password').then(function (hash) {
      pswd.length = 64
      return pswd.compare('password', hash)
    }).then(function (okay) {
      assert(okay)
    })
  })
})
