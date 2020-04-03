export const replace = (text, replacements) => {
  for (let key in replacements) {
    text = text.replace(key, replacements[key]);
  };

  return text;
};