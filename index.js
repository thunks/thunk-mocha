'use strict'
// **Github:** https://github.com/thunks/thunk-mocha
//
// **License:** MIT

const thunk = require('thunks')()

module.exports = thunkMocha

// Patch available mocha instances automatically.
findMocha().forEach(thunkMocha)

function thunkMocha (mocha) {
  if (!mocha || mocha.Runnable.thunkMochaPatched) return
  mocha.Runnable.thunkMochaPatched = true

  let runnableProto = mocha.Runnable.prototype
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

function findMocha () {
  if (typeof window === 'object' && window.Mocha) return [window.Mocha]

  let modules = require.cache || {}

  let items = Object.keys(modules)
    .filter(function (name) {
      // - end of .3.0.2@mocha/index.js for npminstall
      // - end of /mocha/index.js for npm
      return /[\/\\@]mocha[\/\\]index.js$/.test(name)
    })
    .map(function (name) {
      return modules[name].exports
    })

  if (items.length === 0) items.push(require('mocha'))
  return items
}
