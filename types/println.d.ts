/// <reference types="node" />
export declare const println: (output: string, { lines, indent, stream, }?: {
    lines?: number | undefined;
    indent?: number | undefined;
    stream?: (NodeJS.WriteStream & {
        fd: 1;
    }) | undefined;
}) => void;
