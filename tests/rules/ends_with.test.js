import { ends_with } from '../../src/rules'

test('passes with valid condition', () => {
    expect(ends_with('foo', 'o')).toBe(true)
})

test('fails with invalid condition', () => {
    expect(ends_with('foo', 'f')).toBe(false)
})

test('fails with missing arg', () => {
    expect(ends_with('foo')).toBe(false)
})

test('fails with null', () => {
    expect(ends_with(null, null)).toBe(false)
})

test('fails with undefined', () => {
    expect(ends_with(undefined, undefined)).toBe(false)
})

test('fails with array', () => {
    expect(ends_with(['foo'], 'foo')).toBe(false)
})

test('fails with object', () => {
    expect(ends_with({ foo: 'foo' }, 'foo')).toBe(false)
})
