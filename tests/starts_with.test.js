import { starts_with } from './../src/index';

test("passes with letters only", () => {
    expect( starts_with('foo', 'f') ).toBe(true);
})

test("fails with empty string", () => {
    expect( starts_with('', 'a') ).toBe(false);
})

test("fails with missing arg", () => {
    expect( starts_with('foo') ).toBe(false);
})

test("fails with wrong arg", () => {
    expect( starts_with('foo', 'd') ).toBe(false);
})

test("fails with null", () => {
    expect( starts_with(null, null ) ).toBe(false);
})

test("fails with undefined", () => {
    expect( starts_with(undefined, undefined) ).toBe(false);
})

test("fails with array", () => {
    expect( starts_with( ['foo'], 'foo') ).toBe(false);
})

test("fails with object", () => {
    expect( starts_with( { foo: 'foo'}, 'foo') ).toBe(false);
})

