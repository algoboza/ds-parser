import { DSConverter } from '../base';
import { Tokenizer } from '../tokenizer';
import { StringBuilder } from '../utils';
import { Matrix } from './matrix';

function check(rawData: string, isRev: boolean) {
    const tok = new Tokenizer(rawData);

    const fline = tok.readLine();
    const ftok = new Tokenizer(fline);

    let n = ftok.readTokenInt();
    if (isNaN(n) || n < 0) {
        return false;
    }

    let m = ftok.readTokenInt();
    if (isNaN(m) || m < 0) {
        return false;
    }

    if (isRev) {
        [n, m] = [m, n];
    }

    for (let i = 0; i < n; i++) {
        const line = tok.readLine();
        const ctok = new Tokenizer(line);

        for (let j = 0; j < m; j++) {
            const data = ctok.readToken();
            if (data === '') {
                return false;
            }
        }
    }

    if (tok.readToken() !== '') {
        return false;
    }
    return true;
}

function parse(rawData: string, reversed: boolean) {
    const gtok = new Tokenizer(rawData);
    let n: number, m: number;

    const ftok = new Tokenizer(gtok.readLine());
    n = ftok.readTokenInt();
    m = ftok.readTokenInt();

    if (reversed) {
        [n, m] = [m, n];
    }

    const result = new Matrix(n, m);

    for (let i = 0; i < n; i++) {
        const ltok = new Tokenizer(gtok.readLine());
        for (let j = 0; j < m; j++) {
            result[i][j] = ltok.readToken();
        }
    }

    return result;
}

export const standardConverter: DSConverter<Matrix<any>> = {
    detect(rawData: string) {
        return check(rawData, false);
    },
    parse(rawData: string) {
        return parse(rawData, false);
    },
    stringify(matrix: Matrix<any>) {
        const result = new StringBuilder();

        result.write(matrix.height + ' ');
        result.writeLine(matrix.width + ' ');

        for (let i = 0; i < matrix.height; i++) {
            for (let j = 0; j < matrix.width; j++) {
                result.write(matrix[i][j] + ' ');
            }
            result.writeLine('');
        }

        return result.toString();
    },
};
