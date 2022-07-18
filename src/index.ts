import splitChars from 'split-chars';

/**
 * Converts a string to an array of string chars
 * @param {string} str The string to turn into array
 * @returns {string[]}
 */
export function toArray(str: string): string[] {
  if (typeof str !== 'string') {
    throw new Error('A string is expected as input');
  }
  return [...splitChars(str)];
}

/**
 * Returns the length of a string
 *
 * @export
 * @param {string} str
 * @returns {number}
 */
export function length(str: string): number {
  // Check for input
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return [...splitChars(str)].length;
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
export function substring(
  str: string,
  begin: number = 0,
  end: number = Infinity
): string {
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

  const charIter = splitChars(str)[Symbol.iterator]();

  for (let num = 0; num < begin; num++) {
    const { done } = charIter.next();

    if (done) {
      return '';
    }
  }

  let result = '';

  for (let num = 0; num < end! - begin; num++) {
    const { value, done } = charIter.next();

    if (done) {
      break;
    }

    result += value;
  }

  return result;
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
export function substr(
  str: string,
  begin: number | undefined = 0,
  len?: number
): string {
  // Check for input
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  const chars = toArray(str);
  const strLength = chars.length;

  // Fix type
  if (typeof begin !== 'number') {
    begin = Number.parseInt(begin, 10);
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
      len = Number.parseInt(len, 10);
    }

    end = len >= 0 ? len + begin : begin;
  }

  return chars.slice(begin, end).join('');
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
export function limit(
  str: string,
  limit: number = 16,
  padString: string = '#',
  padPosition: 'left' | 'right' = 'right'
): string {
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
  const chars = toArray(str);
  const strLength = chars.length;

  if (strLength > limit) {
    return chars.slice(0, limit).join('');
  } else if (strLength < limit) {
    const padRepeats = (padString as string).repeat(limit - strLength);
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
export function indexOf(
  str: string,
  searchStr: string,
  pos: number = 0
): number {
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
  pos = Number(pos);
  pos = isNaN(pos) ? 0 : pos;
  searchStr = String(searchStr);

  const strArr = toArray(str);
  if (pos >= strArr.length) {
    if (searchStr === '') {
      return strArr.length;
    }
    return -1;
  }
  if (searchStr === '') {
    return pos;
  }

  const searchArr = toArray(searchStr);

  search: for (let startIndex = pos; startIndex < strArr.length; startIndex++) {
    for (let searchIndex = 0; searchIndex < searchArr.length; searchIndex++) {
      if (strArr[startIndex + searchIndex] !== searchArr[searchIndex]) {
        continue search;
      }
    }

    return startIndex;
  }

  return -1;
}
