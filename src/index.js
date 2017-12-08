import { astralRange } from './string';

/**
 * Converts a string to an array of string chars
 * @param {string} str The string to turn into array
 * @returns {string[]}
 */
export function toArray(str) {
  if (typeof str !== 'string') {
    throw new Error('A string is expected as input');
  }
  return str.match(astralRange) || [];
}

/**
 * Returns the length of a string
 *
 * @export
 * @param {string} str
 * @returns {number}
 */
export function length(str) {
  // Check for input
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  const match = str.match(astralRange);
  return match === null ? 0 : match.length;
}

/**
 * Returns a substring by providing start and end position
 *
 * @export
 * @param {string} str
 * @param {number} [begin=0] Starting position
 * @param {number} end End position
 * @returns {string}
 */
export function substring(str, begin = 0, end) {
  // Check for input
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  // Even though negative numbers work here, theyre not in the spec
  if (typeof begin !== 'number' || begin < 0) {
    begin = 0;
  }

  if (typeof end === 'number' && end < 0) {
    end = 0;
  }

  return str
    .match(astralRange)
    .slice(begin, end)
    .join('');
}

/**
 * Returns a substring by providing start position and length
 *
 * @export
 * @param {string} str
 * @param {number} [begin=0] Starting position
 * @param {number} len Desired length
 * @returns {string}
 */
export function substr(str, begin = 0, len) {
  // Check for input
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  const strLength = length(str);

  // Fix type
  if (typeof begin !== 'number') {
    begin = parseInt(begin, 10);
  }

  // Return zero-length string if got oversize number.
  if (begin >= strLength) {
    return '';
  }

  // Calculating postive version of negative value.
  if (begin < 0) {
    begin += strLength;
  }

  let end;

  if (typeof len === 'undefined') {
    end = strLength;
  } else {
    // Fix type
    if (typeof len !== 'number') {
      len = parseInt(len, 10);
    }

    end = len >= 0 ? len + begin : begin;
  }

  return str
    .match(astralRange)
    .slice(begin, end)
    .join('');
}

/**
 * Enforces a string to be a certain length by
 * adding or removing characters
 *
 * @export
 * @param {string} str
 * @param {number} [limit=16] Limit
 * @param {string} [padString='#'] The Pad String
 * @param {string} [padPosition='right'] The Pad Position
 * @returns {string}
 */
export function limit(str, limit = 16, padString = '#', padPosition = 'right') {
  // Input should be a string, limit should be a number
  if (typeof str !== 'string' || typeof limit !== 'number') {
    throw new Error('Invalid arguments specified');
  }

  // Pad position should be either left or right
  if (['left', 'right'].indexOf(padPosition) === -1) {
    throw new Error('Pad position should be either left or right');
  }

  // Pad string can be anything, we convert it to string
  if (typeof padString !== 'string') {
    padString = String(padString);
  }

  // Calculate string length considering astral code points
  const strLength = length(str);

  if (strLength > limit) {
    return substring(str, 0, limit);
  } else if (strLength < limit) {
    const padRepeats = padString.repeat(limit - strLength);
    return padPosition === 'left' ? padRepeats + str : str + padRepeats;
  }

  return str;
}

/**
 * Returns the index of the first occurrence of a given string
 *
 * @export
 * @param {string} str
 * @param {string} [searchStr] the string to search
 * @param {number} [pos] starting position
 * @returns {number}
 */
export function indexOf(str, searchStr, pos) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  if (str === '') {
    if (searchStr === '') {
      return 0;
    }
    return -1;
  }

  // fix type
  pos = parseInt(pos, 10);
  pos = isNaN(pos) ? 0 : pos;
  searchStr = String(searchStr);

  const strArr = str.match(astralRange);
  if (pos >= strArr.length) {
    if (searchStr === '') {
      return strArr.length;
    }
    return -1;
  }
  if (searchStr === '') {
    return pos;
  }

  const searchArr = searchStr.match(astralRange);
  let finded = false;
  let index;
  for (index = pos; index < strArr.length; index += 1) {
    let searchIndex = 0;
    while (
      searchIndex < searchArr.length &&
      searchArr[searchIndex] === strArr[index + searchIndex]
    ) {
      searchIndex += 1;
    }
    if (
      searchIndex === searchArr.length &&
      searchArr[searchIndex - 1] === strArr[index + searchIndex - 1]
    ) {
      finded = true;
      break;
    }
  }
  return finded ? index : -1;
}
