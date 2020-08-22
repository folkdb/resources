import stringifyObject from 'stringify-object';
import kleur from 'kleur';
import cleanStack from 'clean-stack';
import extractStack from 'extract-stack';

const print = (output, { indent = 0, stream = process.stdout, } = {}) => {
    const before = ' '.repeat(indent);
    const indentNewLines = (str) => str.replace(/\n/g, `\n${before}`);
    const formatted = (output.slice(-1) === '\n'
        ? `${indentNewLines(output.slice(0, -1))}\n`
        : indentNewLines(output));
    stream.write(`${before}${formatted}`);
};

const println = (output, { lines = 1, indent = 0, stream = process.stdout, } = {}) => {
    const after = '\n'.repeat(lines);
    print(`${output.trimEnd()}${after}`, { indent, stream });
};

const stringify = (obj) => stringifyObject(obj, {
    indent: '  ',
    singleQuotes: false,
});

const debugPromise = async (promise, timeout = 5) => {
    const expire = () => new Promise((resolve) => {
        setTimeout(() => resolve('%TIMEOUT%'), timeout * 1000);
    });
    let out;
    try {
        const value = await Promise.race([promise, expire()]);
        out = (value === '%TIMEOUT%'
            ? { status: 'pending (timed out)', timeout: `${timeout} seconds` }
            : { status: 'fulfilled', value });
    }
    catch (error) {
        out = { status: 'rejected', error };
    }
    println(stringify(out));
};

const styled = (kind) => {
    switch (kind) {
        case 'primary':
            return (s) => kleur.bold(kleur.blue(s));
        case 'secondary':
            return kleur.magenta;
        case 'info':
            return kleur.cyan;
        case 'success':
            return kleur.green;
        case 'warning':
            return kleur.yellow;
        case 'error':
            return kleur.red;
        case 'muted':
            return kleur.gray;
    }
};

const tryCatch = async (call, originator) => {
    try {
        const result = await call();
        return result;
    }
    catch (err) {
        const errStack = extractStack.lines(cleanStack(err.stack, { basePath: process.cwd() }));
        const errorObj = {
            originator,
            errType: err.name,
            errMessage: err.message,
            errStack,
        };
        [
            '*=================================*',
            '|          RUNTIME ERROR          |',
            '*=================================*',
        ].map(styled('error')).forEach((s) => println(s));
        println('');
        [
            styled('warning')('Exception caught at:'),
            `  library: ${styled('info')('folkdb/resources')}`,
            `  source: ${styled('info')(originator.source)}`,
            `  function: ${styled('info')(originator.function)}`,
        ].forEach((s) => println(s));
        println('');
        println(styled('warning')('Error message:'));
        println(`${styled('error')(err.message)}`, { lines: 2, indent: 2 });
        if (originator.arguments) {
            println(styled('warning')('Check the following arguments:'));
            Object.entries(originator.arguments)
                .forEach(([k, v]) => {
                println(`${k}: ${styled('info')(stringify(v))}`, { indent: 2 });
            });
            println('');
        }
        if (originator.environment) {
            println(styled('warning')('And the following environment variables:'));
            Object.entries(originator.environment)
                .forEach(([k, v]) => {
                println(`${k}: ${styled('info')(stringify(v))}`, { indent: 2 });
            });
            println('');
        }
        if (errStack.length > 0) {
            println(styled('warning')('Stack trace:'));
            errStack.forEach((step) => {
                println(styled('muted')(step), { indent: 2 });
            });
            println('');
        }
        println('');
        process.exitCode = 1;
        return Promise.reject(errorObj);
    }
};

const whatType = (value) => (Object.prototype.toString
    .call(value)
    .slice(8, -1));

export { debugPromise, print, println, stringify, styled, tryCatch, whatType };
