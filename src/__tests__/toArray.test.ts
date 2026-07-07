import assert from 'assert';
import { toArray } from '..';

describe('Convert String to Array', () => {
  it('Converts a simple string to array', () => {
    assert.deepEqual(toArray('abcdefg'), ['a', 'b', 'c', 'd', 'e', 'f', 'g']);
  });
  it('Converts unicode strings to array', () => {
    assert.deepEqual(toArray('🔥👍🏽'), ['🔥', '👍🏽']);
    assert.deepEqual(toArray('Iñtërnâtiônàlizætiøn☃'), [
      'I',
      'ñ',
      't',
      'ë',
      'r',
      'n',
      'â',
      't',
      'i',
      'ô',
      'n',
      'à',
      'l',
      'i',
      'z',
      'æ',
      't',
      'i',
      'ø',
      'n',
      '☃',
    ]);
  });
  it('Throws an error for non-strings', () => {
    // @ts-ignore
    assert.throws(() => toArray({}), Error);
    // @ts-ignore
    assert.throws(() => toArray(1), Error);
    // @ts-ignore
    assert.throws(() => toArray(null), Error);
  });
  it('Converts empty string to empty array', () => {
    assert.deepEqual(toArray(''), []);
  });
});
