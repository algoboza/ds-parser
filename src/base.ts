export interface DSParser<TResult> {
    (rawData: string): TResult;
}

export interface DSStringifier<T> {
    (ds: T): string;
}

export interface DSDetector {
    (rawData: string): boolean;
}

export interface DSConverter<T> {
    parse: DSParser<T>;
    stringify: DSStringifier<T>;
    detect: DSDetector;
}

export interface DSConverterDict<T> {
    [key: string]: DSConverter<T>;
}
