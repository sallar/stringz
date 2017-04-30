import { astralRange } from './string'

export function length (str) {
  // Check for input
  if (typeof str !== 'string') {
    throw new Error('Input must be a string')
  }

  const match = str.match(astralRange)
  return (match === null) ? 0 : match.length
}

export function substring (str, begin = 0, end) {
  // Check for input
  if (typeof str !== 'string') {
    throw new Error('Input must be a string')
  }

  // Even though negative numbers work here, theyre not in the spec
  if (typeof begin !== 'number' || begin < 0) {
    begin = 0
  }

  if (typeof end === 'number' && end < 0) {
    end = 0
  }

  return str.match(astralRange).slice(begin, end).join('')
}

export function substr (str, begin = 0, len) {
  // Check for input
  if (typeof str !== 'string') {
    throw new Error('Input must be a string')
  }

  const strLength = length(str)

  // Fix type
  if (typeof begin !== 'number') {
    begin = parseInt(begin, 10)
  }

  // Return zero-length string if got oversize number.
  if (begin >= strLength) {
    return ''
  }

    // Calculating postive version of negative value.
  if (begin < 0) {
    begin += strLength
  }

  let end

  if (typeof len === 'undefined') {
    end = strLength
  } else {
    // Fix type
    if (typeof len !== 'number') {
      len = parseInt(len, 10)
    }
    if (len >= 0) {
      end = len + begin
    } else {
      end = begin
    }
  }

  return str.match(astralRange).slice(begin, end).join('')
}

export function limit (str, limit = 16, padString = '#', padPosition = 'right') {
  // Input should be a string, limit should be a number
  if (typeof str !== 'string' || typeof limit !== 'number') {
    throw new Error('Invalid arguments specified')
  }

  // Pad position should be either left or right
  if (['left', 'right'].indexOf(padPosition) === -1) {
    throw new Error('Pad position should be either left or right')
  }

  // Pad string can be anything, we convert it to string
  if (typeof padString !== 'string') {
    padString = String(padString)
  }

  // Calculate string length considering astral code points
  const strLength = length(str)

  if (strLength > limit) {
    return substring(str, 0, limit)
  } else if (strLength < limit) {
    const padRepeats = padString.repeat(limit - strLength)
    return (padPosition === 'left') ? padRepeats + str : str + padRepeats
  }

  return str
}
