import { integer } from "../src";

test("passes with integer", () => {
    expect( integer(1) ).toBe(true);
})

test("fails with null", () => {
    expect( integer(null) ).toBe(false);
})

test("fails with undefined", () => {
    expect( integer(undefined) ).toBe(false);
})

test("fails with string", () => {
    expect( integer('foo') ).toBe(false);
})

test("fails with decimal", () => {
    expect( integer(12.5) ).toBe(false);
})

test("fails with string integer", () => {
    expect( integer('1') ).toBe(false);
})

test("fails with string decimal", () => {
    expect( integer('12.5') ).toBe(false);
})

test("fails with array", () => {
    expect( integer([]) ).toBe(false);
})

test("fails with object", () => {
    expect( integer({}) ).toBe(false);
})