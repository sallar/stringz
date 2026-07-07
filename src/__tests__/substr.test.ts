import assert from 'assert';
import { substr } from '..';

describe('Substr', () => {
  const string =
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.";
  const unicodeString = 'دانشگاهی که دانشگاه نباشد، دانشگاه نیست.';
  const emojiString = 'Emojis 👍🏽 are 🍆 poison. 🌮s are bad.';

  it('Substrs latin text correctly', () => {
    assert.strictEqual(substr('Iñtërnâtiônàlizætiøn☃', 0, 10), 'Iñtërnâtiô');
    assert.strictEqual(substr(string, 25, 32), string.substr(25, 32));
  });

  it('Substrs unicode text correctly', () => {
    assert.strictEqual(substr(unicodeString, 0, 11), 'دانشگاهی که');
    assert.strictEqual(substr(emojiString, 7, 7), '👍🏽 are 🍆');
  });

  it('Substrs empty text correctly', () => {
    assert.strictEqual(substr('', 0, 11), '');
    assert.strictEqual(substr('', -1), '');
  });

  it('Substrs if arguments are unspecified', () => {
    // @ts-ignore
    assert.strictEqual(substr(string, 10), string.substr(10));
    // @ts-ignore
    assert.strictEqual(substr(string, 120), string.substr(120));
    // @ts-ignore
    assert.strictEqual(substr(string, '1', '2'), string.substr('1', '2'));
    // @ts-ignore
    assert.strictEqual(substr(string), string);
  });

  it('Substrs even with negative arguments', () => {
    // @ts-ignore
    assert.strictEqual(substr(string, -4), string.substr(-4));
    assert.strictEqual(substr(string, -4, -1), string.substr(-4, -1));
  });

  it('Throws an error if wrong arguments are specified.', () => {
    // @ts-ignore
    assert.throws(() => substr(12, 1, 2), Error);
  });
});
