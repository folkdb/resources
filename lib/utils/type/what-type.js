export const whatType = (value) => (
  Object.prototype.toString
    .call(value)
    .slice(8, -1)
);
