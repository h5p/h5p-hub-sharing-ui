import PropTypes from 'prop-types';

/**
 * Replaces strings in a text. Usefull for handling translation texts
 * including variables.
 * 
 * @param {string} text 
 * @param {array} replacements 
 */
export const replace = (text, replacements) => {
  for (let key in replacements) {
    text = text.replace(key, replacements[key]);
  };

  return text;
};

/**
 * Defines the mandatory info
 * @returns {Object}
 */
export const mandatoryDefinition = PropTypes.shape({
  title: PropTypes.string.isRequired,
  license: PropTypes.string.isRequired,
  licenseVersion: PropTypes.string.isRequired,
  disciplines: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired,
  level: PropTypes.string,
});


/**
 * Defines the optional info
 * @returns {Object}
 */
export const optionalDefinition = PropTypes.shape({
  keywords: PropTypes.array,
  shortDescription: PropTypes.string,
  longDescription: PropTypes.string,
  icon: PropTypes.object,
  screenshots: PropTypes.array
});