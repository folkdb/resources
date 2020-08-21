export const print = (output, {
  indent = 0,
  lines = 0,
  stream = process.stdout,
} = {}) => {
  const before = ' '.repeat(indent);
  const after = '\n'.repeat(lines);
  const indentNewLines = (str) => str.replace(/\n/g, `\n${before}`);
  
  const formatted = (
    output.slice(-1) === '\n'
      ? indentNewLines(output.slice(0, -1)) + '\n'
      : indentNewLines(output)
  );

  stream.write(`${before}${formatted}${after}`);
};
