import { size } from "../src";

test('passes with a string and a valid condition', () => {
    expect(size('foo', 3)).toBe(true);
});

test('passes with an array and a valid condition', () => {
    expect(size(['foo', 'bar'], 2)).toBe(true);
});

test('fails with a string and an invalid condition', () => {
    expect(size('foo', 5)).toBe(false);
});

test('fails with an array and an invalid condition', () => {
    expect(size(['foo', 'bar'], 5)).toBe(false);
});

test("fails with empty string", () => {
    expect( size('') ).toBe(false);
})

test('fails with number', () => {
    expect(size(100, 3)).toBe(false);
});

test("fails with null", () => {
    expect( size(null, null) ).toBe(false);
})

test("fails with undefined", () => {
    expect( size(undefined,undefined) ).toBe(false);
})

test("fails with object", () => {
    expect( size({foo: 10,bar: 20}, 2) ).toBe(false);
})

