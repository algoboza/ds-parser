import { Tokenizer } from './tokenizer';

test('readToken이 Token 하나를 잘 가져와야함', () => {
    let input = 'a \t b \n c';

    let tokenizer = new Tokenizer(input);
    expect(tokenizer.readToken()).toBe('a');
    expect(tokenizer.readToken()).toBe('b');
    expect(tokenizer.readToken()).toBe('c');

    input = '\n\ta \nb\t\t c\n\n';
    tokenizer = new Tokenizer(input);
    expect(tokenizer.readToken()).toBe('a');
    expect(tokenizer.readToken()).toBe('b');
    expect(tokenizer.readToken()).toBe('c');
});

test('readLine이 한 줄을 잘 가져와야함', () => {
    let input: string;

    input = 'hello world\n\nworld hello';

    let tokenizer = new Tokenizer(input);
    expect(tokenizer.readLine()).toBe('hello world');
    expect(tokenizer.readLine()).toBe('');
    expect(tokenizer.readLine()).toBe('world hello');
});

test('readToken과 readLine을 섞어도 잘 작동해야함', () => {
    let input: string;

    input = 'a\t b c \nd   e f \t\n g';

    let tokenizer = new Tokenizer(input);
    expect(tokenizer.readToken()).toBe('a');
    expect(tokenizer.readToken()).toBe('b');
    expect(tokenizer.readToken()).toBe('c');
    expect(tokenizer.readToken()).toBe('d');
    expect(tokenizer.readLine()).toBe('   e f \t');
    expect(tokenizer.readToken()).toBe('g');
});

test('readToken과 readLine이 읽을게 없으면 빈 문자열을 가져와야함', () => {
    let input: string;

    input = 'a b ';

    let tokenizer = new Tokenizer(input);

    expect(tokenizer.readToken()).toBe('a');
    expect(tokenizer.readToken()).toBe('b');
    expect(tokenizer.readToken()).toBe('');

    input = 'a\n';

    tokenizer = new Tokenizer(input);

    expect(tokenizer.readLine()).toBe('a');
    expect(tokenizer.readToken()).toBe('');
    expect(tokenizer.readToken()).toBe('');
});

test('readTokenInt가 정수를 제대로 읽어야함', () => {
    let input: string;

    input = ' 1 -2\n3';

    let tokenizer = new Tokenizer(input);

    expect(tokenizer.readTokenInt()).toEqual(1);
    expect(tokenizer.readTokenInt()).toEqual(-2);
    expect(tokenizer.readTokenInt()).toEqual(3);
});

test('readTokenFloat가 실수를 제대로 읽어야함', () => {
    let input: string;

    input = ' 1.0 -2.7\n3.14';

    let tokenizer = new Tokenizer(input);

    expect(tokenizer.readTokenFloat()).toBeCloseTo(1.0);
    expect(tokenizer.readTokenFloat()).toBeCloseTo(-2.7);
    expect(tokenizer.readTokenFloat()).toBeCloseTo(3.14);
});
