interface Originator {
    library?: string;
    source: string;
    function: string;
    arguments?: any[];
    environment?: any[];
}
export declare const tryCatch: (call: Function, originator: Originator) => Promise<any>;
export {};
