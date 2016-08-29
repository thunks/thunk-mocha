thunk-mocha
==========
Enable support for generators in Mocha with backward compatibility.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

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
// or: require('thunk-mocha')(require('mocha'))
```


## Example

**After patched, mocha support:**
```js
it('support sync test', function () {
  // do some test
})

it('support thunk style async test', function (done) {
  // do some test
  done()
})

it('support promise style async test', function () {
  // do some test
  return promiseLikeObject
})

it('support generator style async test', function * () {
  // do some test
  yield promise
  // yield thunk
  // yield generator
  // ...
})

it('support async/await style async test', async function () {
  // do some test
  await promise
})

it('support Rx.Observable style async test', function () {
  // do some test
  return Rx.Observable.bindNodeCallback(fs.stat)('package.json')
})
```

[npm-url]: https://npmjs.org/package/thunk-mocha
[npm-image]: http://img.shields.io/npm/v/thunk-mocha.svg

[travis-url]: https://travis-ci.org/thunks/thunk-mocha
[travis-image]: http://img.shields.io/travis/thunks/thunk-mocha.svg

[downloads-url]: https://npmjs.org/package/thunk-mocha
[downloads-image]: http://img.shields.io/npm/dm/thunk-mocha.svg?style=flat-square
