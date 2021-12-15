import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isLeapYear)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)
dayjs.extend(customParseFormat)

export const required = (value) => {
    if (Array.isArray(value) && value.length === 0) return false
    else return ![null, undefined, ''].includes(value)
}

export const string = (value) => {
    return typeof value === 'string'
}

export const array = (value) => {
    return Array.isArray(value)
}

export const integer = (value) => {
    return Number.isInteger(value)
}

export const numeric = (value) => {
    return !Number.isNaN(parseFloat(value)) && isFinite(value)
}

export const alpha = (value) => {
    return string(value) && new RegExp('^[A-Za-z]+$').test(value.toLowerCase())
}

export const alpha_numeric = (value) => {
    return (
        string(value) &&
        new RegExp('^[a-zA-Z0-9\\s]+$').test(value.toLowerCase())
    )
}

export const alpha_dash = (value) => {
    return (
        string(value) && new RegExp('^[a-zA-Z-_]+$').test(value.toLowerCase())
    )
}

export const starts_with = (value, arg = null) => {
    return string(value) && string(arg) && value.startsWith(arg)
}

export const ends_with = (value, arg = null) => {
    return string(value) && string(arg) && value.endsWith(arg)
}

export const boolean = (value) => {
    return [true, false].includes(value)
}

export const is_in = (value, arg = null) => {
    if (!string(arg) && !array(arg)) return false

    arg = string(arg) ? arg.split(',') : arg
    return arg.includes(value)
}

export const not_in = (value, arg = null) => {
    if (!string(arg) && !array(arg)) return false

    return !is_in(value, arg)
}

export const size = (value, arg = null) => {
    return !string(value) && !array(value) ? false : value.length === arg
}

export const min = (value, arg = null) => {
    if (!value && !array(value)) {
        return false
    }

    value = string(value) || array(value) ? value.length : value
    return parseFloat(value) >= arg
}

export const max = (value, arg = null) => {
    if (!value && !array(value)) {
        return false
    }

    value = string(value) || array(value) ? value.length : value
    return parseFloat(value) <= arg
}

export const same = (value, arg = null) => {
    return typeof value === 'object'
        ? JSON.stringify(value) === JSON.stringify(arg)
        : value === arg
}
export const different = (value, arg = null) => {
    return !same(value, arg)
}

export const url = (value) => {
    return new RegExp(
        '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-.][a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$'
    ).test(String(value).toLowerCase())
}

export const email = (value) => {
    return new RegExp('^\\S+@\\S+[.][0-9a-z]+$').test(
        String(value).toLowerCase()
    )
}

export const uuid = (value) => {
    if (!string(value)) return false

    return new RegExp(
        '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    ).test(String(value).toLowerCase())
}

export const matches_regex = (value, arg = null) => {
    if (!string(value)) return false

    return new RegExp(arg).test(String(value).toLowerCase())
}

export const json = (value) => {
    if (!string(value)) return false

    try {
        return typeof JSON.parse(value) === 'object'
    } catch (e) {
        return false
    }
}

export const date = (value) => {
    return dayjs(value).isValid()
}

export const after = (value, arg = null) => {
    return dayjs(value).isAfter(arg)
}

export const before = (value, arg = null) => {
    return dayjs(value).isBefore(arg)
}

export const after_or_equal = (value, arg = null) => {
    return dayjs(value).isSameOrAfter(arg)
}

export const before_or_equal = (value, arg = null) => {
    return dayjs(value).isSameOrBefore(arg)
}

export const leap_year = (value) => {
    return dayjs(value).isLeapYear()
}

export const today = (value) => {
    return dayjs(value).isToday()
}

export const tomorrow = (value) => {
    return dayjs(value).isTomorrow()
}

export const yesterday = (value) => {
    return dayjs(value).isYesterday()
}

export const date_format = (value, arg) => {
    return dayjs(value, arg, true).isValid()
}
