
var Promise = require('native-or-bluebird')
var crypto = require('mz/crypto')
var scmp = require('scmp')

module.exports = Password

function Password(options) {
  if (!(this instanceof Password)) return new Password(options)

  options = options || {}
  this.length = options.length || 128
  this.iterations = options.iterations || 12000
}

Password.prototype.salt = function (length) {
  return crypto.randomBytes(length || this.length)
}

Password.prototype.hash = function (password, salt, iterations, length) {
  iterations = iterations || this.iterations
  length = length || this.length
  return (salt ? Promise.resolve(salt) : this.salt().then(toBase64))
    .then(function (_salt) {
      return crypto.pbkdf2(password, salt = _salt, iterations, length)
    })
    .then(function (hash) {
      return [
        salt,
        iterations,
        length,
        hash.toString('base64')
      ].join(';')
    })
}

Password.prototype.compare = function (password, hash) {
  var frags = hash.split(';')
  return this.hash(
    password,
    frags[0],
    parseInt(frags[1], 10),
    parseInt(frags[2], 10)
  ).then(function (res) {
    return scmp(hash, res)
  })
}

function toBase64(x) {
  return x.toString('base64')
}
