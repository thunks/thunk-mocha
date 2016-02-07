'use strict'
// **Github:** https://github.com/thunks/thunk-mocha
//
// **License:** MIT

var path = require('path')
var thunk = require('thunks')()

module.exports = thunkMocha

// Patch available mocha instances automatically.
findMocha().forEach(thunkMocha)

function thunkMocha (mocha) {
  if (!mocha || mocha.Runnable.thunkMochaPatched) return
  mocha.Runnable.thunkMochaPatched = true

  var runnableProto = mocha.Runnable.prototype
  runnableProto._originFn = void 0

  Object.defineProperty(runnableProto, 'fn', {
    get: function () { return this._fn },
    set: function (fn) {
      if (typeof fn !== 'function') this._fn = fn
      else {
        this._fn = function (done) {
          thunk.call(this, fn.length ? fn : fn.call(this))(done)
        }
      }
    },
    enumerable: true,
    configurable: false
  })

  Object.defineProperty(runnableProto, 'async', {
    get: function () { return true },
    enumerable: true,
    configurable: false
  })

  Object.defineProperty(runnableProto, 'sync', {
    get: function () { return false },
    enumerable: true,
    configurable: false
  })
}

function findMocha () {
  if (typeof window === 'object' && window.Mocha) return [window.Mocha]

  var mochaId = path.sep + path.join('', 'mocha', 'index.js')
  var modules = require.cache || {}

  var items = Object.keys(modules)
    .filter(function (name) {
      return name.slice(mochaId.length * -1) === mochaId
    })
    .map(function (name) {
      return modules[name].exports
    })

  if (items.length === 0) items.push(require('mocha'))

  return items
}
