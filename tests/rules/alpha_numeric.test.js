import { alpha_numeric } from '../../src/rules'

test('passes with letters only', () => {
    expect(alpha_numeric('foo')).toBe(true)
})

test('passes with numbers only', () => {
    expect(alpha_numeric('123')).toBe(true)
})

test('passes with letters and numbers', () => {
    expect(alpha_numeric('foo123')).toBe(true)
})

test('fails with special characters', () => {
    expect(alpha_numeric('foo_123?')).toBe(false)
})

test('fails with empty string', () => {
    expect(alpha_numeric('')).toBe(false)
})

test('fails with null', () => {
    expect(alpha_numeric(null)).toBe(false)
})

test('fails with undefined', () => {
    expect(alpha_numeric(undefined)).toBe(false)
})

test('fails with array', () => {
    expect(alpha_numeric([])).toBe(false)
})

test('fails with object', () => {
    expect(alpha_numeric({})).toBe(false)
})
