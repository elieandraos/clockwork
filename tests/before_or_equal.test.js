import { before_or_equal } from "./../src/index";

test("passes with valid condition", () => {
    expect( before_or_equal("2020-8-4", "2021-8-4") ).toBe(true);
    expect( before_or_equal("2020-8-4", "2020-8-4") ).toBe(true);
})

test("passes with invalid condition", () => {
    expect( before_or_equal("2021-8-4", "2020-8-4") ).toBe(false);
})

test("fails with null", () => {
    expect( before_or_equal(null, null) ).toBe(false);
})

test("fails with string", () => {
    expect( before_or_equal('foo', 'foo') ).toBe(false);
})

test("fails with array", () => {
    expect( before_or_equal([], []) ).toBe(false);
})

test("fails with object", () => {
    expect( before_or_equal({}, {}) ).toBe(false);
})
