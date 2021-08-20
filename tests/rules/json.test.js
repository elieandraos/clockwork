import { json } from '../../src/rules'

test('passes with valid object', () => {
    expect(json('{}')).toBe(true)
    expect(json('{"result":true, "count":42}')).toBe(true)
})

test('fails with invalid object', () => {
    expect(json('{ foo : ')).toBe(false)
})

test('fails with numbers', () => {
    expect(json('1')).toBe(false)
})

test('fails with null', () => {
    expect(json(null)).toBe(false)
})

test('fails with undefined', () => {
    expect(json(undefined)).toBe(false)
})
