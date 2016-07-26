# Limit String Length [![Build Status](https://travis-ci.org/sallar/limit-string-length.svg?branch=master)](https://travis-ci.org/sallar/limit-string-length)

This small library limits a string to a specified width:

- Truncates the string if the length is more than the limit
- Pads the string using custom characters if the length is less than the limit, on the right or left
- Works with unicode characters (Emojis, etc)

## Install
```bash
$ npm install limit-string-length --save
```

And import it in your awesome node app:

```javascript
// ES2015+
import limit from 'limit-string-length';

// CommonJS
var limit = require('limit-string-length');
```

## Usage
```javascript
// Truncate:
limit('Life’s like a box of chocolates.', 20); // "Life's like a box of"

// Pad:
limit('Make emojis great again', 26, '💩'); // "Make emojis great again💩💩💩"

// Pad Left:
limit('What are you looking at?', 30, '+'); // "++++++What are you looking at?"

// Unicode Aware:
limit("🤔🤔🤔", 2); // "🤔🤔"
```

## Parameters
    function limit(str[, limit[, padStr[, padPosition]]])

| Param | Type | Default | Description |
|---|---|---|---|
| str | <code>String</code> | *none* | The string to be limited |
| limit | <code>Number</code> | <code>16</code> | Desired string length |
| padStr | <code>String</code> | <code>"#"</code> | Character to pad the output with | 
| padPosition | <code>String</code> | <code>"right"</code> | Pad position: <code>"right"</code> or <code>"left"</code>

## Test
```bash
$ npm run test
```


## Changelog

| Version | Date       | Notes |
|---------|------------|-------|
| 0.0.6   | 2016-07-26 | First usable release |

## License
This software is released under the [MIT License](http://sallar.mit-license.org/).  

    Copyright © 2016 Sallar Kaboli <sallar.kaboli@gmail.com>
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the “Software”), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
