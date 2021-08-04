import { required } from "../src/rules";

test("fails with null", () => {
    expect(required(null)).toBe(false);
})

test("fails with undefined", () => {
    expect(required(undefined)).toBe(false);
})

test("fails with empty string", () => {
    expect(required('')).toBe(false);
})

test("fails with empty array", () => {
    expect(required([])).toBe(false);
})

test("passes with string", () => {
    expect(required('foo')).toBe(true);
})

test("passes with array", () => {
    expect(required(['foo'])).toBe(true);
})

test("passes with integer", () => {
    expect(required(1)).toBe(true);
})