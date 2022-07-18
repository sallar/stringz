import assert from 'assert';
import { length } from '..';

describe('Count String Length', () => {
  it('Counts international strings correctly', () => {
    assert.strictEqual(length('Iñtërnâtiônàlizætiøn☃'), 21);
    assert.strictEqual(length('あ'), 1);
    assert.strictEqual(length('谢'), 1);
    assert.strictEqual(length('سلام خوبی؟'), 10);
  });

  it('Counts empty strings correctly', () => {
    assert.strictEqual(length(''), 0);
  });

  it('Counts emojis correctly', () => {
    assert.strictEqual(length('🐴'), 1);
    assert.strictEqual(length('❤️'), 1);
    assert.strictEqual(length('👍🏽'), 1);
    assert.strictEqual(length('👍🏽💩😊💪🏼😻'), 5);
  });

  it('Counts zalgo', () => {
    assert.strictEqual(length('Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘!͖̬̰̙̗̿̋ͥͥ̂ͣ̐́́͜͞'), 6);
  });

  it('Throws an error if wrong arguments are specified.', () => {
    // @ts-ignore
    assert.throws(() => length(445), Error);
  });
});
