# Stringz [![Build Status](https://travis-ci.org/sallar/stringz.svg?branch=master)](https://travis-ci.org/sallar/stringz) [![codecov](https://codecov.io/gh/sallar/stringz/branch/master/graph/badge.svg)](https://codecov.io/gh/sallar/stringz)

A really small, performant, zero-dependency, unicode-aware library for working with Strings in Node.js.

Javascript has a serious problem with unicode. Even ES6 can’t solve the problem entirely since some characters like the
new colored emojis are three bytes instead of two bytes. Sometimes even more! `"👍🏽".length` returns `4` which is totally
wrong (hint: it should be 1!). ES6's `Array.from` tried to solve this, but that even fails: `Array.from("👍🏽")` returns
`["👍", "🏽"]` which is incorrect. This library tries to tackle all these problems with a mega RegExp.
[Read More Here](https://mathiasbynens.be/notes/javascript-unicode).

🎈 Based on a RegExp copied from the [Lodash](https://github.com/lodash/lodash) library.

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Features

- Limit string to width (truncate/pad)
- Unicode-aware string length
- Unicode-aware substring
- Unicode-aware substr
- Performant

## Install

```bash
$ npm install stringz --save
```

And import it in your awesome node app:

```javascript
// ES2015+
import * as stringz from 'stringz'; // OR:
import { limit, substring, length, substr } from 'stringz';

// CommonJS
var stringz = require('stringz');
// use like: stringz.limit ...
```

## Usage

### Limit String to Width

    function limit(str[, limit[, padStr[, padPosition]]])

| Param | Type | Default | Description |
|---|---|---|---|
| str | <code>String</code> | *none* | The string to be limited |
| limit | <code>Number</code> | <code>16</code> | Desired string length |
| padStr | <code>String</code> | <code>"#"</code> | Character to pad the output with | 
| padPosition | <code>String</code> | <code>"right"</code> | Pad position: <code>"right"</code> or <code>"left"</code>

#### Examples

```javascript
// Truncate:
limit("Life’s like a box of chocolates.", 20); // "Life's like a box of"

// Pad:
limit("Make emojis great again", 26, "💩"); // "Make emojis great again💩💩💩"
limit("What are you looking at?", 30, "+", "left"); // "++++++What are you looking at?"

// Unicode Aware:
limit("🤔🤔🤔", 2); // "🤔🤔"
limit("👍🏽👍🏽", 4, "👍🏽"); // "👍🏽👍🏽👍🏽👍🏽" 
```

### String Length

    function length(str)

| Param | Type | Default | Description |
|---|---|---|---|
| str | <code>String</code> | *none* | String to return the length for |

#### Examples

```javascript
length("Iñtërnâtiônàlizætiøn☃💩"); // 22
```

### Substring

    function substring(str, start[, end])

| Param | Type | Default | Description |
|---|---|---|---|
| str | <code>String</code> | *none* | String to be devided |
| start | <code>Number</code> | *none* | Start position |
| end | <code>Number</code> | End of string | End position |

#### Examples

```javascript
substring("Emojis 👍🏽 are 🍆 poison. 🌮s are bad.", 7, 14); // "👍🏽 are 🍆"
```

### Substr

    function substr(str[, start[, length]])

| Param | Type | Default | Description |
|---|---|---|---|
| str | <code>String</code> | *none* | String to be devided |
| start | <code>Number</code> | Start of string | Start position |
| length | <code>Number</code> | String length minus `start` parameter | Length of result |

#### Examples

```javascript
substr("A.C. Milan 🇮🇹⚽️", 5, 7); // "Milan 🇮🇹"
```

## Test

```bash
$ npm test
```

## Benchmark

This library scores high in a length benchmark (it's intended usage) and should be fast for most use case.

```
Stringz .length (accruate) x 861,039 ops/sec ±1.57% (84 runs sampled)
Lodash .toArray (accruate) x 795,108 ops/sec ±2.13% (82 runs sampled)
Emoji Aware .split (inaccurate) x 2,269 ops/sec ±1.38% (85 runs sampled)
Spliddit .length (inaccurate) x 487,718 ops/sec ±2.21% (83 runs sampled)
UTF8 Length (inaccurate) x 232,918 ops/sec ±1.02% (87 runs sampled)
Fastest is Stringz .length
```

To run benchmarks yourself:

``` bash
$ cd ./benchmark
$ npm install
$ node run.js
```

## Changelog

| Version | Date       | Notes |
|---------|------------|-------|
| 0.2.3   | 2017-09-19 | Add `.babelrc` to `.gitignore` |
| 0.2.2   | 2017-06-20 | Fix Typescript Definition Issue #14 |
| 0.2.1   | 2017-05-27 | Add Typescript Definitions |
| 0.2.0   | 2017-04-30 | [New `substr` function](https://github.com/sallar/stringz/pull/10) |
| 0.1.2   | 2017-04-25 | Fix null length issue #8 |
| 0.1.1   | 2016-07-31 | More strict type checking, more tests |
| 0.1.0   | 2016-07-29 | Renamed to Stringz, more tools |
| 0.0.10  | 2016-07-29 | Fixed substring issue |
| 0.0.9   | 2016-07-28 | Fixed unicode string length issue |
| 0.0.8   | 2016-07-26 | First usable release |

## License

This software is released under the [MIT License](http://sallar.mit-license.org/).

Uses a RegExp from the [Lodash](https://github.com/lodash/lodash) which is released under the
[MIT License](https://raw.githubusercontent.com/lodash/lodash/4.14.1/LICENSE).
