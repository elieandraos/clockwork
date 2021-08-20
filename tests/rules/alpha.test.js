import { alpha } from '../../src/rules'

test('passes with letters only', () => {
    expect(alpha('foo')).toBe(true)
})

test('fails with letters and dashes', () => {
    expect(alpha('foo-')).toBe(false)
})

test('fails with letters and numbers', () => {
    expect(alpha('foo123')).toBe(false)
})

test('fails with letters and special characters', () => {
    expect(alpha('foo_bar')).toBe(false)
})

test('fails with empty string', () => {
    expect(alpha('')).toBe(false)
})

test('fails with null', () => {
    expect(alpha(null)).toBe(false)
})

test('fails with undefined', () => {
    expect(alpha(undefined)).toBe(false)
})

test('fails with array', () => {
    expect(alpha([])).toBe(false)
})

test('fails with object', () => {
    expect(alpha({})).toBe(false)
})
