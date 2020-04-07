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