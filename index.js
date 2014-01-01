var crypto = require('crypto')

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

Password.prototype.hash = function* (password, salt) {
  salt = salt || (yield this.salt).toString('base64')
  var iterations = this.iterations
  var length = this.length
  var hash = yield function (done) {
    crypto.pbkdf2(password, salt, iterations, length, done)
  }

  return salt + ';' + hash.toString('base64')
}

Password.prototype.compare = function* (password, hash) {
  return hash === (yield* this.hash(password, hash.split(';')[0]))
}