export const parseStrings = (parser, strings) => Promise.all(
  strings.map((s) => parser(s)),
);