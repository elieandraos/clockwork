import { array } from "./../src/index";

test("passes with array", () => {
    expect( array(['foo']) ).toBe(true);
})

test("passes with empty array", () => {
    expect( array([]) ).toBe(true);
})

test("fails with null", () => {
    expect( array(null) ).toBe(false);
})

test("fails with undefined", () => {
    expect( array(undefined) ).toBe(false);
})

test("fails with string", () => {
    expect( array('foo') ).toBe(false);
})

test("fails with object", () => {
    expect( array({}) ).toBe(false);
})