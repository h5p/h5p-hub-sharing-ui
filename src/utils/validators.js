/**
 * Ages above this value is invalid.
 * @type {number}
 */
const ageThreshold = 100;

/**
 * Checks if a string is a valid integer
 * @param string
 */
const isValidInteger = (string) => {
  const int = parseInt(string);
  return Number.isInteger(int)
    && int.toString() === string
    && int <= ageThreshold;
}

/**
 * Validate age
 * Valid formats:
 *  - integer, e.g. "24"
 *  - range, e.g. "12-15"
 *  - slice from start, e.g. "-33"
 *  - slice to end, e.g. "50-"
 *
 *  @param {String} age
 *
 *  @return {boolean} True if valid
 */
export const validateAge = (age) => {
  const trimmed = age.trim();

  // Age is optional
  if (trimmed === '') {
    return true;
  }

  // Integer
  if (!trimmed.includes('-')) {
    return isValidInteger(trimmed);
  }

  // Range
  const [from, to, ...invalid] = trimmed.split('-');

  // Validate inputs exists and does not contains invalid ranges
  if ((!to && !from) || invalid.length) {
    return false;
  }

  // Range from 0
  if (from === '') {
    return isValidInteger(to);
  }

  // Range to infinity
  if (to === '') {
    return isValidInteger(from);
  }

  // Range start to end
  return isValidInteger(from)
    && isValidInteger(to)
    && (parseInt(from) < parseInt(to));
}
