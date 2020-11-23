import { TokenizeChain, tokenize } from './tokenize';

test('Tokenizer 체인을 리턴해야함', () => {
    const chain = tokenize('');

    expect(chain instanceof TokenizeChain).toBe(true);
});
