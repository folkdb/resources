import stringifyObject from 'stringify-object';

export const stringify = (obj: any) => stringifyObject(obj, {
  indent: '  ',
  singleQuotes: false,
});
