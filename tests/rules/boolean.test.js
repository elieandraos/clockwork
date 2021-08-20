import { boolean } from '../../src/rules'

test('passes with valid conditions', () => {
    expect(boolean(true)).toBe(true)
    expect(boolean(false)).toBe(true)
})

test('fails with null', () => {
    expect(boolean(null)).toBe(false)
})

test('fails with undefined', () => {
    expect(boolean(undefined)).toBe(false)
})

test('fails with array', () => {
    expect(boolean([])).toBe(false)
})

test('fails with object', () => {
    expect(boolean({})).toBe(false)
})

test('fails with truthy and falsy values', () => {
    expect(boolean(1)).toBe(false)
    expect(boolean('1')).toBe(false)
    expect(boolean('true')).toBe(false)
    expect(boolean(0)).toBe(false)
    expect(boolean('0')).toBe(false)
    expect(boolean('false')).toBe(false)
})
