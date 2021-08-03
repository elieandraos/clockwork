import { today } from "./../src/index";

test("passes with valid condition", () => {
    expect( today(new Date()) ).toBe(true);
})

test("passes with invalid condition", () => {
    expect( today("2020-8-4") ).toBe(false);
})

test("fails with null", () => {
    expect( today(null) ).toBe(false);
})

test("fails with string", () => {
    expect( today('foo') ).toBe(false);
})

test("fails with array", () => {
    expect( today([]) ).toBe(false);
})

test("fails with object", () => {
    expect( today({}) ).toBe(false);
})
