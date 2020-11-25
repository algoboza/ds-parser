import { DSConverter } from '../base';
import { Tokenizer } from '../tokenizer';
import { StringBuilder } from '../utils';
import { List } from './list';

/**
 * 일반적인 리스트 형태
 * ```
 * 5
 * 1 2 3 4 5
 * ```
 */
const standardConverter: DSConverter<List<any>> = {
    detect(rawData: string) {
        const tok = new Tokenizer(rawData);
        const n = tok.readTokenInt();

        if (isNaN(n) || n < 0) {
            return false;
        }

        for (let i = 0; i < n; i++) {
            const t = tok.readToken();
            if (t === '') {
                return false;
            }
        }

        if (tok.readToken() !== '') {
            return false;
        }

        return true;
    },
    parse(rawData: string): List<any> {
        const tok = new Tokenizer(rawData);
        const n = tok.readTokenInt();

        const result = new List<any>();
        for (let i = 0; i < n; i++) {
            const t = tok.readToken();
            result.push(t);
        }
        return result;
    },
    stringify(list: List<any>) {
        let result = new StringBuilder();

        result.writeLine(list.length);

        list.forEach((item) => result.write(item + ' '));

        return result.toString();
    },
};

export default standardConverter;
