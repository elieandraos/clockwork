import { not_in } from "../src";

test('passes with array and valid condition', () => {
    expect( not_in('hello', ['foo', 'bar']) ).toBe(true);
});

test('passes with comma separated string and valid condition', () => {
    expect( not_in('hello', 'foo,bar') ).toBe(true);
});

test('fails with array and invalid condition', () => {
    expect( not_in('foo', ['foo', 'bar']) ).toBe(false);
});

test('fails with comma separated string and invalid condition', () => {
    expect( not_in('foo', 'foo,bar') ).toBe(false);
});

test("fails with numbers", () => {
    expect( not_in(5, 123 ) ).toBe(false);
})

test("fails with null", () => {
    expect( not_in(null, null ) ).toBe(false);
})

test("fails with undefined", () => {
    expect( not_in(undefined, undefined) ).toBe(false);
})

test("fails with object", () => {
    expect( not_in( 'bar', { foo: 'foo'}) ).toBe(false);
})