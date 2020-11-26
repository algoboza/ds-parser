import { List } from './list';
import pythonLikeConverter from './pythonLikeConverter';

test('파싱 가능한지 올바르게 감지해야함', () => {
    // 파싱 가능
    expect(pythonLikeConverter.detect('[1,2,3,4,5]')).toBe(true);
    expect(pythonLikeConverter.detect('  [1, 2 ,3,4,  5] ')).toBe(true);
    expect(pythonLikeConverter.detect('[a, bb,ccc, dddd]')).toBe(true);
    expect(pythonLikeConverter.detect('[]')).toBe(true);

    // 파싱 불가
    expect(pythonLikeConverter.detect('[')).toBe(false);
    expect(pythonLikeConverter.detect('(1,2,3)')).toBe(false);
    expect(pythonLikeConverter.detect('[1,2,3,4,5')).toBe(false);
    expect(pythonLikeConverter.detect('[1,2,3,4,,5]')).toBe(false);
    expect(pythonLikeConverter.detect('[1,2,3,4,5,]')).toBe(false);
});

test('파싱이 올바르게 되어야함', () => {
    expect(pythonLikeConverter.parse('[1,2,3,4,5]')).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
    ]);
    expect(pythonLikeConverter.parse('[a, bb,ccc, dddd]')).toEqual([
        'a',
        'bb',
        'ccc',
        'dddd',
    ]);
    expect(pythonLikeConverter.parse('[]')).toEqual([]);
    expect(pythonLikeConverter.parse('[1]')).toEqual(['1']);
});

test('문자열로 올바르게 변환되어야함', () => {
    let list: List<any> = new List([1, 2, 3, 4]);
    expect(pythonLikeConverter.stringify(list)).toEqual('[1, 2, 3, 4]');

    list = new List(['a', 'b', 'cc', 'ddd']);
    expect(pythonLikeConverter.stringify(list)).toEqual('[a, b, cc, ddd]');

    list = new List(['1']);
    expect(pythonLikeConverter.stringify(list)).toEqual('[1]');

    list = new List([]);
    expect(pythonLikeConverter.stringify(list)).toEqual('[]');
});
