export class List<T> extends Array<T> {
    constructor(arr?: T[]) {
        super();
        if (arr !== undefined) {
            arr.forEach((item) => this.push(item));
        }
    }

    toString() {
        return super.toString();
    }
}
