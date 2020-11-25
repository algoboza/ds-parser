import { List } from './list';
import standardConverter from './standardConverter';

test('파싱 가능한지 올바르게 감지해야함', () => {
    // 파싱 가능
    expect(standardConverter.detect('5 1 2 3 4 5')).toBe(true);
    expect(standardConverter.detect('4\n\na b  c\td  ')).toBe(true);
    expect(standardConverter.detect('0')).toBe(true);

    // 파싱 불가
    expect(standardConverter.detect('a 1 3 5')).toBe(false);
    expect(standardConverter.detect('-10 1 3 5')).toBe(false);
    expect(standardConverter.detect('2 1')).toBe(false);
    expect(standardConverter.detect('4\na b  c\td e f   ')).toBe(false);
    expect(standardConverter.detect('3')).toBe(false);
});

test('파싱이 올바르게 되어야함', () => {
    expect(standardConverter.parse('5 1 2 3 4 5')).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
    ]);

    expect(standardConverter.parse('4\n\na bb  ccc\tdddd')).toEqual([
        'a',
        'bb',
        'ccc',
        'dddd',
    ]);

    expect(standardConverter.parse('0')).toEqual([]);
});

test('문자열로 다시 변환되어야함', () => {
    let list = new List(['a', 'b', 'c']);
    expect(standardConverter.stringify(list)).toBe('3\na b c ');

    list = new List([]);
    expect(standardConverter.stringify(list)).toBe('0\n');
});
