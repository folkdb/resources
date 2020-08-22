export const caseOf = (kvList : Array<string> | Array<number>, {
  defaultTo = undefined,
  test = (a, b) => (a === b),
} = {}) => (value) => {
  const match = ([pattern]) => test(pattern, value);
  const [_, result] = kvList.find(match) || ['_', defaultTo];

  return result;
};
