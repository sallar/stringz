import assert from 'assert';
import { limit } from '../src/index';

describe('Limit String Length', () => {
  it("Truncates the string if it's more than limit", () => {
    assert.equal(
      limit("Life's like a box of chocolates.", 20),
      "Life's like a box of"
    );
  });

  it('Truncates the string if it includes unicode characters', () => {
    assert.equal(
      limit("Life's like a box of 🍫s.", 22),
      "Life's like a box of 🍫"
    );
    assert.equal(
      limit("Life's like a box of 👍🏽s.", 22),
      "Life's like a box of 👍🏽"
    );
  });

  it("Pads the string if it's less than the limit", () => {
    assert.equal(
      limit("Life's like a box of chocolates.", 35),
      "Life's like a box of chocolates.###"
    );
    assert.equal(limit('🔥🔥', 4), '🔥🔥##');
    assert.equal(limit('ab', 5, 2), 'ab222');
  });

  it("Doesn't modify the string if the length is the same", () => {
    assert.equal(
      limit("Life's like a box of chocolates.", 32),
      "Life's like a box of chocolates."
    );
  });

  it('Uses custom padding if provided', () => {
    assert.equal(
      limit("Life's like a box of chocolates.", 35, '/'),
      "Life's like a box of chocolates.///"
    );
  });

  it('Applies padding to correct position if specified', () => {
    assert.equal(
      limit("Life's like a box of chocolates.", 35, '/', 'left'),
      "///Life's like a box of chocolates."
    );
  });

  it('Throws an error if wrong arguments are specified.', () => {
    assert.throws(() => limit(12), Error);
    assert.throws(() => limit('abc', 'abc'), Error);
    assert.throws(() => limit('abc', 10, '#', 'mongo'), Error);
  });
});
