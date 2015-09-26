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

## Usage

**Call by mocha in CLI:**

```sh
mocha -r thunk-mocha
```

**Call in js file:**

```js
require('thunk-mocha')()
```

## Example

**After patched, mocha support:**

```js
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

[npm-url]: https://npmjs.org/package/thunk-mocha
[npm-image]: http://img.shields.io/npm/v/thunk-mocha.svg

[travis-url]: https://travis-ci.org/thunks/thunk-mocha
[travis-image]: http://img.shields.io/travis/thunks/thunk-mocha.svg
