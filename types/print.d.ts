/// <reference types="node" />
export declare const print: (output: string, { indent, stream, }?: {
    indent?: number | undefined;
    stream?: (NodeJS.WriteStream & {
        fd: 1;
    }) | undefined;
}) => void;
