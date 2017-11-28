import assert from 'assert'
import { indexOf } from '../src/index'

describe('IndexOf', () => {
  it('Behaves same with String.prototype.indexOf', () => {
    assert.strictEqual(indexOf('Blue Whale', 'Blue'), 'Blue Whale'.indexOf('Blue'))
    assert.strictEqual(indexOf('Blue Whale', 'Blute'), 'Blue Whale'.indexOf('Blute'))
    assert.strictEqual(indexOf('Blue Whale', 'Whale', 0), 'Blue Whale'.indexOf('Whale', 0))
    assert.strictEqual(indexOf('Blue Whale', 'Whale', 5), 'Blue Whale'.indexOf('Whale', 5))
    assert.strictEqual(indexOf('Blue Whale', 'Whale', 7), 'Blue Whale'.indexOf('Whale', 7))
    assert.strictEqual(indexOf('Blue Whale', 'Whale', 10), 'Blue Whale'.indexOf('Whale', 10))
    assert.strictEqual(indexOf('Blue Whale', ''), 'Blue Whale'.indexOf('Blue', ''))
    assert.strictEqual(indexOf('Blue Whale', '', 9), 'Blue Whale'.indexOf('', 9))
    assert.strictEqual(indexOf('Blue Whale', '', 10), 'Blue Whale'.indexOf('', 10))
    assert.strictEqual(indexOf('Blue Whale', '', 11), 'Blue Whale'.indexOf('', 11))
  })

  it('Indexof international text correctly', () => {
    assert.strictEqual(indexOf('Iñtërnâtiônàlizætiøn☃', 'âti'), 6)
    assert.strictEqual(indexOf('あ', 'あ'), 0)
    assert.strictEqual(indexOf('谢谢茄子', '茄子'), 2)
    assert.strictEqual(indexOf('سلام خوبی؟', 'م'), 3)
  })

  it('Indexof unicode text correctly', () => {
    assert.strictEqual(indexOf('社保了💦，谢谢🍆！', '💦'), 3)
    assert.strictEqual(indexOf('社保了💦，谢谢🍆！', '谢谢'), 5)
  })

  it('Indexof empty string', () => {
    assert.strictEqual(indexOf('', ''), ''.indexOf(''))
    assert.strictEqual(indexOf('', 'Blue'), ''.indexOf('Blue'))
  })

  it('Indexof unexpected arguments type correctly', () => {
    assert.strictEqual(indexOf('Blue Whale', null), 'Blue Whale'.indexOf(null, ''))
    assert.strictEqual(indexOf('Blue undefined Whale', undefined), 'Blue undefined Whale'.indexOf(undefined))
    assert.strictEqual(indexOf('Blue Whale', 'Whale', Object), 'Blue Whale'.indexOf('Whale', Object))
  })

  it('Throws an error if wrong arguments are specified.', () => {
    assert.throws(() => indexOf(1212), Error)
  })
})
