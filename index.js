var crypto = require('crypto')
var scmp = require('scmp')

module.exports = Password

function Password(options) {
  if (!(this instanceof Password))
    return new Password(options)

  options = options || {}
  this.length = options.length || 128
  this.iterations = options.iterations || 12000

  var self = this
  this.salt = function (done) {
    crypto.randomBytes(self.length, done)
  }
}

Password.prototype.hash = function* (password, salt, iterations, length) {
  salt = salt || (yield this.salt).toString('base64')
  iterations = iterations || this.iterations
  length = length || this.length
  var hash = yield function (done) {
    crypto.pbkdf2(password, salt, iterations, length, done)
  }

  return [
    salt,
    iterations,
    length,
    hash.toString('base64')
  ].join(';')
}

Password.prototype.compare = function* (password, hash) {
  var frags = hash.split(';')
  var res = yield* this.hash(
    password,
    frags[0],
    parseInt(frags[1], 10),
    parseInt(frags[2], 10)
  )
  return scmp(hash, res)
}
