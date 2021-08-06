const dayjs = require('dayjs');

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const isLeapYear = require('dayjs/plugin/isLeapYear');
const isToday = require('dayjs/plugin/isToday');
const isTomorrow = require('dayjs/plugin/isTomorrow');
const isYesterday = require('dayjs/plugin/isYesterday');

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isLeapYear);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);

const required = function(value)  {
    if( Array.isArray(value) && value.length === 0 )
        return false;
    else
        return ![ null, undefined, '' ].includes(value);
}

const string = function(value) {
    return typeof value === 'string';
}

const array = function(value) {
    return Array.isArray(value);
}

const integer = function(value) {
    return Number.isInteger(value);
}

const numeric = function(value) {
    return !Number.isNaN(parseFloat(value)) && isFinite(value);
}

const alpha = function(value) {
    return string(value) && new RegExp("^[A-Za-z]+$").test(value.toLowerCase());
}

const alpha_numeric = function(value) {
    return string(value) && new RegExp("^[a-zA-Z0-9\\s]+$").test(value.toLowerCase());
}

const alpha_dash = function(value) {
    return string(value) && new RegExp("^[a-zA-Z-_]+$").test(value.toLowerCase());
}

const starts_with = function(value, arg = null) {
    return string(value) && string(arg) && value.startsWith(arg);
}

const ends_with = function(value, arg = null) {
    return string(value) && string(arg) && value.endsWith(arg);
}

const boolean = function(value) {
    return [true, false].includes(value);
}

const is_in = function(value, arg = null) {
    if(!string(arg) && !array(arg))
        return false;

    arg = string(arg) ? arg.split(',') : arg;
    return arg.includes(value);
}

const not_in = function(value, arg = null) {
    if(!string(arg) && !array(arg))
        return false;

    return !is_in(value, arg);
}

const size = function(value, arg = null) {
    return (!string(value) && !array(value)) ? false : value.length === arg;
}

const min = function (value, arg = null) {
    if(!value && !array(value)) {
        return false;
    }

    value = ( string(value) || array(value) ) ? value.length : value;
    return parseFloat(value) >= arg;
}

const max = function(value, arg = null) {
    if(!value && !array(value)) {
        return false;
    }

    value = ( string(value) || array(value) ) ? value.length : value;
    return parseFloat(value) <= arg;
}

const same = function(value, arg = null) {
    return (typeof value === 'object') ? JSON.stringify(value) === JSON.stringify(arg) : value === arg;
}
const different = function(value, arg = null) {
    return !same(value, arg);
}

const url = function(value) {
    return new RegExp(
        "^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-.][a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$"
    ).test(String(value).toLowerCase());
}

const email = function(value) {
    return new RegExp("^\\S+@\\S+[.][0-9a-z]+$").test(String(value).toLowerCase());
}

const uuid = function(value) {
    if(!string(value))
        return false;

    return new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$").test(String(value).toLowerCase());
}

const matches_regex = function(value, arg = null) {
    return new RegExp(arg).test(String(value).toLowerCase());
}

const json = function(value) {
    if(!string(value))
        return false;

    try {
        return typeof JSON.parse(value) === "object";
    } catch (e) {
        return false;
    }
}

const date = function(value) {
    return dayjs(value).isValid();
}

const after = function(value, arg = null) {
    return dayjs(value).isAfter(arg);
}

const before = function(value, arg = null) {
    return dayjs(value).isBefore(arg);
}

const after_or_equal = function(value, arg = null) {
    return dayjs(value).isSameOrAfter(arg);
}

const before_or_equal = function(value, arg = null) {
    return dayjs(value).isSameOrBefore(arg);
}

const leap_year = function(value) {
    return dayjs(value).isLeapYear();
}

const today = function(value) {
    return dayjs(value).isToday();
}

const tomorrow = function(value) {
    return dayjs(value).isTomorrow();
}

const yesterday = function(value) {
    return dayjs(value).isYesterday();
}

module.exports = {
    required,
    string,
    array,
    integer,
    numeric,
    alpha,
    alpha_numeric,
    alpha_dash,
    starts_with,
    ends_with,
    boolean,
    is_in,
    not_in,
    size,
    min,
    max,
    same,
    different,
    url,
    email,
    uuid,
    matches_regex,
    json,
    date,
    after,
    before,
    after_or_equal,
    before_or_equal,
    leap_year,
    today,
    tomorrow,
    yesterday
}