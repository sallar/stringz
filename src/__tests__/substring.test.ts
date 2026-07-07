import assert from 'assert';
import { substring } from '..';

describe('Substring', () => {
  const string =
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.";
  const unicodeString = 'علم نور است و جهل تاریکی.';
  const emojiString = 'Emojis 👍🏽 are 🍆 poison. 🌮s are bad.';

  it('Substrings latin text correctly', () => {
    assert.strictEqual(substring('Iñtërnâtiônàlizætiøn☃', 0, 10), 'Iñtërnâtiô');
    assert.strictEqual(
      substring(string, 25, 57),
      'the universe and human stupidity',
    );
  });

  it('Substrings unicode text correctly', () => {
    assert.strictEqual(substring(unicodeString, 0, 11), 'علم نور است');
    assert.strictEqual(substring(emojiString, 7, 14), '👍🏽 are 🍆');
  });

  it('Substrings empty text correctly', () => {
    assert.strictEqual(substring('', 0, 11), '');
  });

  it('Substrings if arguments are unspecified', () => {
    // @ts-ignore
    assert.strictEqual(substring(string, 10), string.substring(10));
    // @ts-ignore
    assert.strictEqual(substring(string), string);
  });

  it('Substrings even with negative arguments', () => {
    // @ts-ignore
    assert.strictEqual(substring(string, -10), string.substring(-10));
    assert.strictEqual(substring(string, -10, -10), string.substring(-10, -10));
  });

  it('Throws an error if wrong arguments are specified.', () => {
    // @ts-ignore
    assert.throws(() => substring(12, 1, 2), Error);
  });
});
