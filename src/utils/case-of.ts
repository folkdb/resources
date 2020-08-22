export const caseOf<T> = (kvList: [string, T][] | [number, T][], {
  defaultTo = undefined,
  test = (a, b) => (a === b),
} = {}) => (value): T => {
  const match = ([pattern]) => test(pattern, value);
  const [_, result] = kvList.find(match) || ['_', defaultTo];

  return result;
};
