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
    parser: DSParser<T>;
    stringifier: DSStringifier<T>;
    detector: DSDetector;
}

export interface DSConverterDict<T> {
    [key: string]: DSConverter<T>;
}
