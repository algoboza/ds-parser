function isFunction(target: any): target is Function {
    return !!(target && target.constructor && target.apply);
}

export class Matrix<T> extends Array<Array<T | null>> {
    height: number;
    width: number;
    constructor(
        height: number,
        width: number,
        assign: T | null | (() => T) = null
    ) {
        super(height);
        this.height = height;
        this.width = width;

        let assignFunc: Function;

        if (isFunction(assign)) {
            assignFunc = assign;
        } else {
            assignFunc = () => assign;
        }

        for (let i = 0; i < height; i++) {
            this[i] = [...new Array<T | null>(width)].map(() => assignFunc());
        }
    }
}
