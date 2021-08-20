import { max } from '../../src/rules'

test('passes with numbers and valid condition', () => {
    expect(max(5, 10)).toBe(true)
    expect(max(12.75, 42.3)).toBe(true)
})

test('passes with string and valid condition', () => {
    expect(max('foo&bar', 10)).toBe(true)
})

test('passes with array and valid condition', () => {
    expect(max([1, 2, 3], 5)).toBe(true)
})

test('fails with numbers and invalid condition', () => {
    expect(max(10, 2)).toBe(false)
    expect(max(12.5, 5.5)).toBe(false)
})

test('fails with string and invalid condition', () => {
    expect(max('foo&bar', 4)).toBe(false)
})

test('fails with array and invalid condition', () => {
    expect(max([1, 2, 3], 2)).toBe(false)
})

test('fails with object', () => {
    expect(max({ 1: 1 }, 2)).toBe(false)
})

test('fails with empty string', () => {
    expect(max('', 1)).toBe(false)
})

test('fails with null', () => {
    expect(max(null, null)).toBe(false)
})

test('fails with undefined', () => {
    expect(max(undefined, undefined)).toBe(false)
})

test('fails with object', () => {
    expect(max({ foo: 'foo' }, 'foo')).toBe(false)
})
