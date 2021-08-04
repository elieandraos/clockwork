import { string } from "../src";

test("passes with string", () => {
    expect( string('foo') ).toBe(true);
})

test("passes with empty string", () => {
    expect( string('') ).toBe(true);
})

test("fails with null", () => {
    expect( string(null) ).toBe(false);
})

test("fails with undefined", () => {
    expect( string(undefined) ).toBe(false);
})

test("fails with array", () => {
    expect( string([]) ).toBe(false);
})

test("fails with object", () => {
    expect( string({}) ).toBe(false);
})

