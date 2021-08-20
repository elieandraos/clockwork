const dayjs = require('dayjs')

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const isLeapYear = require('dayjs/plugin/isLeapYear')
const isToday = require('dayjs/plugin/isToday')
const isTomorrow = require('dayjs/plugin/isTomorrow')
const isYesterday = require('dayjs/plugin/isYesterday')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isLeapYear)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)
dayjs.extend(customParseFormat)

export function required(value) {
    if (Array.isArray(value) && value.length === 0) return false
    else return ![null, undefined, ''].includes(value)
}

export function string(value) {
    return typeof value === 'string'
}

export function array(value) {
    return Array.isArray(value)
}

export function integer(value) {
    return Number.isInteger(value)
}

export function numeric(value) {
    return !Number.isNaN(parseFloat(value)) && isFinite(value)
}

export function alpha(value) {
    return string(value) && new RegExp('^[A-Za-z]+$').test(value.toLowerCase())
}

export function alpha_numeric(value) {
    return (
        string(value) &&
        new RegExp('^[a-zA-Z0-9\\s]+$').test(value.toLowerCase())
    )
}

export function alpha_dash(value) {
    return (
        string(value) && new RegExp('^[a-zA-Z-_]+$').test(value.toLowerCase())
    )
}

export function starts_with(value, arg = null) {
    return string(value) && string(arg) && value.startsWith(arg)
}

export function ends_with(value, arg = null) {
    return string(value) && string(arg) && value.endsWith(arg)
}

export function boolean(value) {
    return [true, false].includes(value)
}

export function is_in(value, arg = null) {
    if (!string(arg) && !array(arg)) return false

    arg = string(arg) ? arg.split(',') : arg
    return arg.includes(value)
}

export function not_in(value, arg = null) {
    if (!string(arg) && !array(arg)) return false

    return !is_in(value, arg)
}

export function size(value, arg = null) {
    return !string(value) && !array(value) ? false : value.length === arg
}

export function min(value, arg = null) {
    if (!value && !array(value)) {
        return false
    }

    value = string(value) || array(value) ? value.length : value
    return parseFloat(value) >= arg
}

export function max(value, arg = null) {
    if (!value && !array(value)) {
        return false
    }

    value = string(value) || array(value) ? value.length : value
    return parseFloat(value) <= arg
}

export function same(value, arg = null) {
    return typeof value === 'object'
        ? JSON.stringify(value) === JSON.stringify(arg)
        : value === arg
}
export function different(value, arg = null) {
    return !same(value, arg)
}

export function url(value) {
    return new RegExp(
        '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-.][a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$'
    ).test(String(value).toLowerCase())
}

export function email(value) {
    return new RegExp('^\\S+@\\S+[.][0-9a-z]+$').test(
        String(value).toLowerCase()
    )
}

export function uuid(value) {
    if (!string(value)) return false

    return new RegExp(
        '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    ).test(String(value).toLowerCase())
}

export function matches_regex(value, arg = null) {
    if (!string(value)) return false

    return new RegExp(arg).test(String(value).toLowerCase())
}

export function json(value) {
    if (!string(value)) return false

    try {
        return typeof JSON.parse(value) === 'object'
    } catch (e) {
        return false
    }
}

export function date(value) {
    return dayjs(value).isValid()
}

export function after(value, arg = null) {
    return dayjs(value).isAfter(arg)
}

export function before(value, arg = null) {
    return dayjs(value).isBefore(arg)
}

export function after_or_equal(value, arg = null) {
    return dayjs(value).isSameOrAfter(arg)
}

export function before_or_equal(value, arg = null) {
    return dayjs(value).isSameOrBefore(arg)
}

export function leap_year(value) {
    return dayjs(value).isLeapYear()
}

export function today(value) {
    return dayjs(value).isToday()
}

export function tomorrow(value) {
    return dayjs(value).isTomorrow()
}

export function yesterday(value) {
    return dayjs(value).isYesterday()
}

export function date_format(value, arg) {
    return dayjs(value, arg, true).isValid()
}
