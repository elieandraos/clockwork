import { multiple_of } from '../../src/rules'

test('passes with valid condition', () => {
    expect(multiple_of(9, 3)).toBe(true)
})

test('passes with invalid condition', () => {
    expect(multiple_of(9, 4)).toBe(false)
})

test('fails with empty string', () => {
    expect(multiple_of('')).toBe(false)
})

test('fails with null', () => {
    expect(multiple_of(null)).toBe(false)
})

test('fails with undefined', () => {
    expect(multiple_of(undefined)).toBe(false)
})

test('fails with array', () => {
    expect(multiple_of([])).toBe(false)
})

test('fails with object', () => {
    expect(multiple_of({})).toBe(false)
})
