import { numeric } from "../src";

test("passes with integer", () => {
    expect( numeric(1) ).toBe(true);
})

test("passes with decimal", () => {
    expect( numeric(1.5) ).toBe(true);
})
test("passes with string integer", () => {
    expect( numeric('1') ).toBe(true);
})

test("passes with string decimal", () => {
    expect( numeric('12.5') ).toBe(true);
})

test("fails with null", () => {
    expect( numeric(null) ).toBe(false);
})

test("fails with undefined", () => {
    expect( numeric(undefined) ).toBe(false);
})

test("fails with string", () => {
    expect( numeric('foo') ).toBe(false);
})

test("fails with array", () => {
    expect( numeric([]) ).toBe(false);
})

test("fails with object", () => {
    expect( numeric({}) ).toBe(false);
})