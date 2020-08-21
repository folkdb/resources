export const caseOf = (kvList, {
  defaultTo = undefined,
  test = (a, b) => (a === b),
} = {}) => (value) => {
  const match = ([pattern]) => test(pattern, value);
  const [_, result] = kvList.find(match) || ['_', defaultTo];

  return result;
};
