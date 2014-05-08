
var crypto = require('mz/crypto')
var scmp = require('scmp')

module.exports = Password

function Password(options) {
  if (!(this instanceof Password))
    return new Password(options)

  options = options || {}
  this.length = options.length || 128
  this.iterations = options.iterations || 12000
}

Password.prototype.salt = function (length) {
  return crypto.randomBytes(length || this.length)
}

Password.prototype.hash = function* (password, salt, iterations, length) {
  salt = salt || (yield this.salt()).toString('base64')
  iterations = iterations || this.iterations
  length = length || this.length
  var hash = yield crypto.pbkdf2(password, salt, iterations, length)

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
