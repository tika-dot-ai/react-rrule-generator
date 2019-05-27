import each from 'lodash.every';
import isFunction from 'lodash.isfunction';
import isPlainObject from 'lodash.isplainobject';
import get from 'lodash.get';

const replacePlaceholder = (text, replacements = {}) => {
  each(replacements, (value, key) => {
    text = text.replace(`%{${key}}`, value);
  });

  return text;
};

const translateLabel = (translations, key, replacements = {}) => {
  if (isFunction(translations)) {
    return translations(key, replacements);
  } else if (isPlainObject(translations)) {
    return replacePlaceholder(
      get(translations, key, `[translation missing '${key}']`),
      replacements,
    );
  }

  return null;
};

export default translateLabel;
