const Benchmark = require('benchmark');
const EmojiAware = require('emoji-aware');
const Stringz = require('stringz');
const Spliddit = require('spliddit');
const Bytes = require('utf8-length');
const _ = require('lodash');

const suite = new Benchmark.Suite();
const str = 'Iñtërnâtiônàlizætiøn☃👍🏽💩😊💪🏼😻';

// add tests
suite
  .add('Stringz .length (accurate)', function () {
    return Stringz.length(str);
  })
  .add('Lodash .toArray (accurate)', function () {
    return _.toArray(str).length;
  })
  .add('Emoji Aware .split (inaccurate)', function () {
    return EmojiAware.split(str).length;
  })
  .add('Spliddit .length (inaccurate)', function () {
    return Spliddit(str).length;
  })
  .add('UTF8 Length (inaccurate)', function () {
    return Bytes(str);
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });
