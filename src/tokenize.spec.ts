import { Tokenizer } from './tokenize';

test('readToken 이 Token 하나를 잘 가져와야함', () => {
    const input: string = '   a \t b \n c';

    let tokenizer = new Tokenizer(input);
    expect(tokenizer.readToken()).toBe('a');
    expect(tokenizer.readToken()).toBe('b');
    expect(tokenizer.readToken()).toBe('c');
});

test('readLine 이 한 줄을 잘 가져와야함', () => {
    let input: string;

    input = 'hello world\nworld hello';

    let tokenizer = new Tokenizer(input);
    expect(tokenizer.readLine()).toBe('hello world');
    expect(tokenizer.readLine()).toBe('world hello');
});
