'use strict'
// **Github:** https://github.com/thunks/thunk-mocha
//
// **License:** MIT

var thunk = require('thunks')()

module.exports = function thunkMocha (mocha) {
  var runnableProto = mocha.Runnable.prototype

  runnableProto._originFn = undefined
  Object.defineProperty(runnableProto, 'fn', {
    get: function () {
      var _originFn = this._originFn
      if (!_originFn) return _originFn
      return function (done) {
        thunk.call(this, _originFn.length ? _originFn : _originFn.call(this))(done)
      }
    },
    set: function (fn) {
      this._originFn = fn
    },
    enumerable: true,
    configurable: false
  })

  Object.defineProperty(runnableProto, 'async', {
    get: function () { return true },
    set: function () {},
    enumerable: true,
    configurable: false
  })

  Object.defineProperty(runnableProto, 'sync', {
    get: function () { return false },
    set: function () {},
    enumerable: true,
    configurable: false
  })
}
