declare type Style = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'muted';
export declare const styled: (kind: Style) => (s: string) => string;
export {};
