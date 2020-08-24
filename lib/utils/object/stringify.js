import stringifyObject from 'stringify-object';

export const stringify = (obj) => stringifyObject(obj, {
  indent: '  ',
  singleQuotes: false,
});
