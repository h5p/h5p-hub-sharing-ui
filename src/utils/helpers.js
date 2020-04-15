import PropTypes from 'prop-types';
import axios from 'axios';

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

/**
 * Publish to the HUB
 *
 * @param {string} url
 * @param {object} values
 * @param {Function} done
 */
export const publishToHub = (url, values, done) => {
  const fields = new FormData();

  fields.append('title', values.title);
  fields.append('license', values.license);
  fields.append('licenseVersion', values.licenseVersion);
  fields.append('language', values.language);
  fields.append('level', values.level);
  values.disciplines.forEach(discipline => {
    fields.append('disciplines[]', discipline);
  });
  values.keywords.forEach(keyword => {
    fields.append('keywords[]', keyword);
  });

  fields.append('shortDescription', values.shortDescription);
  fields.append('longDescription', values.longDescription)
  fields.append('icon', values.icon.file);

  values.screenshots.forEach(element => {
    if (element.file) {
      fields.append("screenshots[]", element.file);
      fields.append("screenshots[]", element.alt);
    }
  });

  axios.post(url, fields, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(done)
    .catch(done); // TODO - what if it fails?
}