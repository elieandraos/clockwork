import { after_or_equal } from "../../src/rules";

test("passes with valid condition", () => {
    expect( after_or_equal("2021-8-4", "2020-8-4") ).toBe(true);
    expect( after_or_equal("2021-8-4", "2021-8-4") ).toBe(true);
})

test("passes with invalid condition", () => {
    expect( after_or_equal("2020-8-4", "2021-8-4") ).toBe(false);
})

test("fails with null", () => {
    expect( after_or_equal(null, null) ).toBe(false);
})

test("fails with string", () => {
    expect( after_or_equal('foo', 'foo') ).toBe(false);
})

test("fails with array", () => {
    expect( after_or_equal([], []) ).toBe(false);
})

test("fails with object", () => {
    expect( after_or_equal({}, {}) ).toBe(false);
})

test("fails with undefined", () => {
    expect( after_or_equal(undefined, undefined) ).toBe(false);
})
