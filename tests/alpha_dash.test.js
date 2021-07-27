import { alpha_dash } from './../src/index';

test("passes with letters only", () => {
    expect( alpha_dash('foo') ).toBe(true);
})

test("passes with dashes only", () => {
    expect( alpha_dash('-_-') ).toBe(true);
})

test("passes with letters and dashes only", () => {
    expect( alpha_dash('foo-bar_taz') ).toBe(true);
})

test("fails with numbers", () => {
    expect( alpha_dash('foo-123') ).toBe(false);
})

test("fails with special characters", () => {
    expect( alpha_dash('foo_123?') ).toBe(false);
})

test("fails with empty string", () => {
    expect( alpha_dash('') ).toBe(false);
})

test("fails with integer", () => {
    expect( alpha_dash(1) ).toBe(false);
})

test("fails with null", () => {
    expect( alpha_dash(null) ).toBe(false);
})

test("fails with undefined", () => {
    expect( alpha_dash(undefined) ).toBe(false);
})

test("fails with array", () => {
    expect( alpha_dash([]) ).toBe(false);
})

test("fails with object", () => {
    expect( alpha_dash({}) ).toBe(false);
})

