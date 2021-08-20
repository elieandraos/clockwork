import { min } from '../../src/rules'

test('passes with numbers and valid condition', () => {
    expect(min(10, 5)).toBe(true)
    expect(min(12.5, 2.3)).toBe(true)
})

test('passes with string and valid condition', () => {
    expect(min('foo&bar', 5)).toBe(true)
})

test('passes with array and valid condition', () => {
    expect(min([1, 2, 3], 2)).toBe(true)
})

test('fails with numbers and invalid condition', () => {
    expect(min(10, 20)).toBe(false)
    expect(min(12.5, 22.5)).toBe(false)
})

test('fails with string and invalid condition', () => {
    expect(min('foo&bar', 10)).toBe(false)
})

test('fails with array and invalid condition', () => {
    expect(min([1, 2, 3], 5)).toBe(false)
})

test('fails with object', () => {
    expect(min({ 1: 1 }, 2)).toBe(false)
})

test('fails with empty string', () => {
    expect(min('', 1)).toBe(false)
})

test('fails with null', () => {
    expect(min(null, null)).toBe(false)
})

test('fails with undefined', () => {
    expect(min(undefined, undefined)).toBe(false)
})

test('fails with object', () => {
    expect(min({ foo: 'foo' }, 'foo')).toBe(false)
})
