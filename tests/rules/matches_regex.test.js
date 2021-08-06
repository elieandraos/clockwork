import { matches_regex } from "../../src/rules";

test('passes with valid pattern', () => {
    expect( matches_regex('foobar', '^[A-Za-z]+$') ).toBe(true);
});

test('fails with invalid pattern', () => {
    expect( matches_regex('foo-bar', '^[A-Za-z]+$') ).toBe(false);
    expect( matches_regex(null, '^[A-Za-z]+$') ).toBe(false);
    expect( matches_regex(undefined, '^[A-Za-z]+$') ).toBe(false);
    expect( matches_regex([], '^[A-Za-z]+$') ).toBe(false);
});