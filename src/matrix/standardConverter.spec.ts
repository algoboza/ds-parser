import { Matrix } from './matrix';
import { standardConverter } from './standardConverter';

function list2mat<T>(list: Array<Array<T>>) {
    const n = list.length;
    const m = list[0].length;

    const r = new Matrix<T>(n, m);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            r[i][j] = list[i][j];
        }
    }

    return r;
}

test('파싱 가능한지 올바르게 감지해야함', () => {
    // 파싱 가능
    let str: string;

    str = '2 3\n  1 2\t 3\n4 5 6';
    expect(standardConverter.detect(str)).toBe(true);

    str = '1 1\n 1 ';
    expect(standardConverter.detect(str)).toBe(true);

    str = '0 0\n';
    expect(standardConverter.detect(str)).toBe(true);

    // 파싱 불가
    str = '2 3\n1 2 3';
    expect(standardConverter.detect(str)).toBe(false);

    str = '3 2\n1 2 3\n4 5 6';
    expect(standardConverter.detect(str)).toBe(false);

    str = '3 2\n1 2 3 4\n4 5 6';
    expect(standardConverter.detect(str)).toBe(false);
});

test('파싱이 올바르게 되어야함', () => {
    let str: string;

    str = '2 3\n  1 2\t 3\n4 5 6';

    expect(standardConverter.parse(str)).toEqual(
        list2mat([
            ['1', '2', '3'],
            ['4', '5', '6'],
        ])
    );

    str = '1 1\n\ta';

    expect(standardConverter.parse(str)).toEqual(list2mat([['a']]));
});

test('문자열로 다시 변환되어야함', () => {
    let mat = list2mat([
        ['1', '2', '3'],
        ['4', '5', '6'],
    ]);
    expect(standardConverter.stringify(mat)).toBe('2 3 \n1 2 3 \n4 5 6 \n');

    mat = list2mat([['1', '2', '3']]);
    expect(standardConverter.stringify(mat)).toBe('1 3 \n1 2 3 \n');

    mat = new Matrix(0, 0);
    expect(standardConverter.stringify(mat)).toBe('0 0 \n');
});
