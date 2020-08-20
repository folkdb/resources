export const caseOf = (kvList, {
  default,
  test = (a, b) => (a === b),
} = {}) => (value) => {
  const match = ([pattern, expr]) => test(pattern, value);
  const [_, result] = kvList.find(match) || ['_', defaultValue];
  
  return result; 
};