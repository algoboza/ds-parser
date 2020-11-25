export class StringBuilder {
    private buffer: string[];

    constructor() {
        this.buffer = [];
    }

    write(str: any) {
        this.buffer.push(str.toString());
    }

    writeLine(str: any) {
        this.buffer.push(str.toString());
        this.buffer.push('\n');
    }

    toString() {
        return this.buffer.join('');
    }
}
