export interface TokenizeState {
    target: string;
    cursor: number;
}

const TokenDelimiter = ['\n', '\t', ' '] as const;
const LineDelimiter = ['\n'] as const;

export class Tokenizer {
    private state: TokenizeState;

    constructor(rawString: string) {
        this.state = {
            target: rawString,
            cursor: 0,
        };
    }

    readToken(delimiter: readonly string[] = TokenDelimiter) {
        const buffer: string[] = [];

        while (this.state.cursor < this.state.target.length) {
            const cur = this.state.target[this.state.cursor];

            if (delimiter.includes(cur)) {
                if (buffer.length === 0) {
                    this.state.cursor += 1;
                    continue;
                } else {
                    break;
                }
            } else {
                buffer.push(cur);
            }

            this.state.cursor += 1;
        }

        return buffer.join('');
    }

    readLine() {
        return this.readToken(LineDelimiter);
    }
}
