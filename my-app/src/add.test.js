const funcs = require('./add');

//test('adds 1 + 2 to be 3', () =>
//{
//    expect(add(1,2)).toBe(3);
//})

describe("additive functions", () => {
    test('adds numbers correctly', () => {
        expect(funcs.add(10,20)).toBe(30);
    });

    test('subtracts numbers correctly',() => {
        expect(funcs.subtract(10,20)).toBe(-10);
    });
});

describe('multiplicative functions', () => {
    test('multiplies numbers correctly', () => {
        expect(funcs.multiply(10,20)).toBe(200);
    });

    test('divides numbers correctly',() => {
        expect(funcs.divide(10,20)).toBe(0.5);
    });
});
