interface StringReader {
    readable: boolean;
    read(): string;
    peek(): string;
}
class TokenizeReader implements StringReader {
    target: string;
    cursor: number;

    constructor(target: string) {
        this.target = target;
        this.cursor = 0;
    }

    get readable(): boolean {
        return this.cursor < this.target.length;
    }

    read(): string {
        return this.target[this.cursor++];
    }

    peek(): string {
        return this.target[this.cursor];
    }
}

const TokenDelimiter: readonly string[] = ['\n', '\t', ' '] as const;
const LineDelimiter: readonly string[] = ['\n'] as const;

export class Tokenizer {
    private reader: StringReader;

    constructor(rawString: string) {
        this.reader = new TokenizeReader(rawString);
    }

    readToken(delimiter: readonly string[] = TokenDelimiter): string {
        const buffer: string[] = [];

        while (this.reader.readable) {
            const cur = this.reader.peek();

            if (delimiter.includes(cur)) {
                if (buffer.length === 0) {
                    this.reader.read();
                    continue;
                } else {
                    break;
                }
            } else {
                buffer.push(cur);
            }

            this.reader.read();
        }

        return buffer.join('');
    }

    readLine(): string {
        const buffer: string[] = [];

        while (this.reader.readable) {
            const cur = this.reader.peek();

            if (LineDelimiter.includes(cur)) {
                this.reader.read();
                break;
            } else {
                buffer.push(cur);
            }

            this.reader.read();
        }

        return buffer.join('');
    }

    readTokenInt(radix: number = 10) {
        return parseInt(this.readToken(), radix);
    }

    readTokenFloat() {
        return parseFloat(this.readToken());
    }
}
