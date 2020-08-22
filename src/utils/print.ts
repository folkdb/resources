export const print = (output: string, {
  indent = 0,
  stream = process.stdout,
} = {}) => {
  const before = ' '.repeat(indent);
  const indentNewLines = (str: string) => str.replace(/\n/g, `\n${before}`);

  const formatted = (
    output.slice(-1) === '\n'
      ? `${indentNewLines(output.slice(0, -1))}\n`
      : indentNewLines(output)
  );

  stream.write(`${before}${formatted}`);
};
