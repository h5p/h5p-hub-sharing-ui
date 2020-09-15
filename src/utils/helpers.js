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
  }

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
export const publishToHub = (url, token, values, done, fail) => {
  const fields = new FormData();

  fields.append('token', token);
  fields.append('title', values.title);
  fields.append('license', values.license);
  if (values.licenseVersion !== null) {
    fields.append('license_version', values.licenseVersion);
  }
  fields.append('language', values.language);
  fields.append('level', values.level);
  values.disciplines.forEach(discipline => {
    fields.append('disciplines[]', discipline);
  });
  values.keywords.forEach(keyword => {
    fields.append('keywords[]', keyword);
  });

  fields.append('summary', values.shortDescription);
  fields.append('description', values.longDescription)
  if (values.icon.file !== undefined) {
    fields.append('icon', values.icon.file);
  }
  if (values.remove_icon) {
    fields.append('remove_icon', 1);
  }
  
  values.screenshots.forEach(element => {
    if (element.file) {
      fields.append("screenshots[]", element.file);
    }
    fields.append("screenshot_alt_texts[]", element.alt);
  });

  values.remove_screenshots.forEach(removed_screenshot => {
      fields.append("remove_screenshots[]", removed_screenshot);
  });

  axios.post(url, fields, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 10000,
  }).then(done)
    .catch(fail)
}

/**
 * Register on the hub
 *
 * @param {string} url
 * @param {object} values
 * @param {Function} done
 * @param {Function} fail
 */
export const registerToHub = (url, token, values, done, fail) => {
  const fields = new FormData();

  fields.append('token', token);
  fields.append('name', values.publisher);
  fields.append('email', values.emailAddress);
  fields.append('description', values.publisherDescription);
  fields.append('contact_person', values.contactPerson);
  fields.append('phone', values.phone);
  fields.append('address', values.address);
  fields.append('city', values.city);
  fields.append('zip', values.zip);
  fields.append('country', values.country);
  fields.append('logo', values.logo.file);
  fields.append('remove_logo', values.removeLogo ? '1' : '0');

  axios.post(url, fields, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 10000,
  }).then(done)
    .catch(fail)
}
