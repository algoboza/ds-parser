import { Matrix } from './matrix';

test('', () => {
    let mat = new Matrix<number>(4, 3);

    mat[1][2] = 10;
    expect(mat[3][0]).toBe(null);
    expect(mat[4]).toBeUndefined();
    expect(mat[0][3]).toBeUndefined();
    expect(mat[1][2]).toBe(10);

    let assignFn = jest.fn(() => 87);
    mat = new Matrix(20, 30, assignFn);
    expect(mat[5][5]).toBe(87);
    expect(mat[20]).toBeUndefined();
    expect(assignFn.mock.calls.length).toBe(20 * 30);
});
