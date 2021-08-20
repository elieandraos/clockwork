import { leap_year } from '../../src/rules'

test('passes with valid condition', () => {
    expect(leap_year('2000-8-4')).toBe(true)
    expect(leap_year('1996-8-4')).toBe(true)
})

test('passes with invalid conditions', () => {
    expect(leap_year('2021-8-4')).toBe(false)
    expect(leap_year('1999-8-4')).toBe(false)
})

test('fails with null', () => {
    expect(leap_year(null)).toBe(false)
})

test('fails with string', () => {
    expect(leap_year('foo')).toBe(false)
})

test('fails with array', () => {
    expect(leap_year([])).toBe(false)
})

test('fails with object', () => {
    expect(leap_year({})).toBe(false)
})
