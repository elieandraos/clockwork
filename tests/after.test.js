import { after } from "./../src/index";


test("passes with valid condition", () => {
    expect( after("2021-8-4", "2020-8-4") ).toBe(true);
})

test("passes with invalid condition", () => {
    expect( after("2020-8-4", "2021-8-4") ).toBe(false);
})

test("fails with null", () => {
    expect( after(null, null) ).toBe(false);
})

test("fails with string", () => {
    expect( after('foo', 'foo') ).toBe(false);
})

test("fails with array", () => {
    expect( after([], []) ).toBe(false);
})

test("fails with object", () => {
    expect( after({}, {}) ).toBe(false);
})
