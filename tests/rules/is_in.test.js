import { is_in } from "../../src/rules";

test('passes with array and valid condition', () => {
    expect( is_in('foo', ['foo', 'bar']) ).toBe(true);
});

test('passes with comma separated string and valid condition', () => {
    expect( is_in('bar', 'foo,bar') ).toBe(true);
});

test('fails with array and invalid condition', () => {
    expect( is_in('hello', ['foo', 'bar']) ).toBe(false);
});

test('fails with comma separated string and invalid condition', () => {
    expect( is_in('hello', 'foo,bar') ).toBe(false);
});

test("fails with numbers", () => {
    expect( is_in(1, 123 ) ).toBe(false);
})

test("fails with null", () => {
    expect( is_in(null, null ) ).toBe(false);
})

test("fails with undefined", () => {
    expect( is_in(undefined, undefined) ).toBe(false);
})

test("fails with object", () => {
    expect( is_in( 'foo', { foo: 'foo'}) ).toBe(false);
})