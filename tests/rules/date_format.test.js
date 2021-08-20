import { date_format } from '../../src/rules'

test('passes with valid date format', () => {
    expect(date_format('1979-10-22', 'YYYY-MM-DD')).toBe(true)
    expect(date_format('1979-10-22', 'YYYY/MM/DD')).toBe(false)
})

test('fails with null', () => {
    expect(date_format(null)).toBe(false)
})

test('fails with string', () => {
    expect(date_format('foo')).toBe(false)
})

test('fails with array', () => {
    expect(date_format([])).toBe(false)
})

test('fails with object', () => {
    expect(date_format({})).toBe(false)
})
