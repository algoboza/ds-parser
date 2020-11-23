export interface TokenizeState {
    target: string;
    cursor: number;
}

export class TokenizeChain {
    state: TokenizeState;
    result: Array<string | number>;

    constructor(rawString: string) {
        this.state = {
            target: rawString,
            cursor: 0,
        };
        this.result = [];
    }

    tokenString() {
        const buffer: string[] = [];

        while (this.state.cursor < this.state.target.length) {
            const cur = this.state.target[this.state.cursor];

            if (cur === '\n' || cur === '\t' || cur === ' ') {
                break;
            } else {
                buffer.push(cur);
            }

            this.state.cursor += 1;
        }

        this.result.push(buffer.join(''));
    }
}

export function tokenize(rawString: string) {
    const chain = new TokenizeChain(rawString);
    return chain;
}
