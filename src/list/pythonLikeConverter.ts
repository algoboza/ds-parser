import { DSConverter } from '../base';
import { StringBuilder } from '../utils';
import { List } from './list';

/**
 * 파이썬 리스트 형태
 * ```
 * [1,2,3,4,5]
 * [a, b, c, d, e]
 * ```
 */
const pythonLikeConverter: DSConverter<List<any>> = {
    detect(rawData: string) {
        rawData = rawData.trim();

        if (rawData.length < 2) {
            return false;
        }

        if (rawData[0] !== '[' || rawData[rawData.length - 1] !== ']') {
            return false;
        }

        let buf = '';
        for (let i = 1; i < rawData.length - 1; i++) {
            if (rawData[i] === ',') {
                if (buf === '') {
                    return false;
                }
                buf = '';
            } else if ([' ', '\t'].includes(rawData[i])) {
                if (buf.length > 0) {
                    return false;
                }
            } else {
                buf += rawData[i];
            }
        }

        return true;
    },
    parse(rawData: string): List<any> {
        rawData = rawData.trim();

        const result: string[] = [];
        let buf = '';
        for (let i = 1; i < rawData.length - 1; i++) {
            if (rawData[i] === ',') {
                result.push(buf);
                buf = '';
            } else if ([' ', '\t'].includes(rawData[i])) {
                continue;
            } else {
                buf += rawData[i];
            }
        }
        if (buf.length > 0) {
            result.push(buf);
        }
        return result;
    },
    stringify(list: List<any>) {
        const result = new StringBuilder();

        result.write('[');
        result.write(list[0]);

        for (let i = 1; i < list.length; i++) {
            result.write(', ');
            result.write(list[i]);
        }
        result.write(']');

        return result.toString();
    },
};

export default pythonLikeConverter;
