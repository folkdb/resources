export const caseOf = (kvList, {
  defaultTo,
  test = (a, b) => (a === b),
} = {}) => (value) => {
  const match = ([pattern, expr]) => test(pattern, value);
  const [_, result] = kvList.find(match) || ['_', defaultTo];

  return result;
};
