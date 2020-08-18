const print = (output, {
  error = false,
  stringify = true,
  pretty = true,
  indent = 2,
} = {}) => {
  const printer = error ? console.error : console.log;
  const dataType = Object.prototype.toString.call(output).slice(8, -1);
  
  if (stringify && (dataType === 'Object' || dataType === 'Array')) {
    const space = pretty ? indent : 0;
    printer(JSON.stringify(output, undefined, space));
  } else {
    printer(output);
  }
};