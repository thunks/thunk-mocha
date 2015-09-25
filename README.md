thunk-mocha
==========
Enable support for generators in Mocha with backward compatibility.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

It is similar to [Co Mocha](https://github.com/blakeembrey/co-mocha), but it is a different implementation and more powerful. It is a perfect patch for mocha!

## Installation

```
npm install thunk-mocha
```

## Example

```js
var mocha = require('mocha')
var thunkMocha = require('thunk-mocha')
thunkMocha(mocha)

describe('thunk-mocha', function () {
  // support generator
  beforeEach(function *() {
    // do some thing
  })

  // backward compatibility for old style!
  it('test1', function (done) {
    // do some test
    done()
  })

  // support generator
  it('test2', function *() {
    // do some test
  })

  // support promise
  it('test3', function () {
    // do some test
    return promise
  })

  // another way with thunk function
  it('test4', function () {
    // do some test
    return thunkFn
  })

  // or simple sync test!
  it('test5', function () {
    // do some test
  })
})
```

## API

```js
var thunkMocha = require('thunk-mocha')
```
### thunkMocha(require('mocha'))

[npm-url]: https://npmjs.org/package/thunk-mocha
[npm-image]: http://img.shields.io/npm/v/thunk-mocha.svg

[travis-url]: https://travis-ci.org/thunks/thunk-mocha
[travis-image]: http://img.shields.io/travis/thunks/thunk-mocha.svg
