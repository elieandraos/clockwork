import { before } from "../../src/rules";

test("passes with valid condition", () => {
    expect( before("2020-8-4", "2021-8-4") ).toBe(true);
})

test("passes with invalid condition", () => {
    expect( before("2021-8-4", "2020-8-4") ).toBe(false);
})

test("fails with null", () => {
    expect( before(null, null) ).toBe(false);
})

test("fails with string", () => {
    expect( before('foo', 'foo') ).toBe(false);
})

test("fails with array", () => {
    expect( before([], []) ).toBe(false);
})

test("fails with object", () => {
    expect( before({}, {}) ).toBe(false);
})

test("fails with undefined", () => {
    expect( before(undefined, undefined) ).toBe(false);
})
