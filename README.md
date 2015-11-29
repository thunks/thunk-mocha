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
// make sure that `mocha` have loaded
require('thunk-mocha')()
// or
// require('thunk-mocha')(require('mocha'))
```


## Example

**After patched, mocha support:**
```js
// backward compatibility for old callback style!
it('test1', function (done) {
  // do some test
  done()
})

// backward compatibility for simple sync test!
it('test2', function () {
  // do some test
})

// support generator
it('test3', function *() {
  // do some test
  // yield promise
  // yield thunk
  // yield generator
  // ...
})

// support promise
it('test4', function () {
  // do some test
  return promiseLikeObject
})

// another way with thunk function
it('test5', function () {
  // do some test
  return thunkFunction
})
```

[npm-url]: https://npmjs.org/package/thunk-mocha
[npm-image]: http://img.shields.io/npm/v/thunk-mocha.svg

[travis-url]: https://travis-ci.org/thunks/thunk-mocha
[travis-image]: http://img.shields.io/travis/thunks/thunk-mocha.svg
