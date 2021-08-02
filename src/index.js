const dayjs = require('dayjs');

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
        "^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$"
    ).test(String(value).toLowerCase());
}

const email = function(value) {
    return new RegExp("^\\S+@\\S+[\\.][0-9a-z]+$").test(String(value).toLowerCase());
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

// dayjs is a wrapper for the native Date() function.
// All the supported date-string formats are supported.
// the most common are 'y-m-d', 'm-d-y' for short versions.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
// https://www.codegrepper.com/code-examples/javascript/toLocaleDateString%28%29+options

//console.log(dayjs('2019/05/03').format('MM-DD-YYYY'));

// short version date
//console.log(dayjs('2021-04-20').isValid()); // y-m-d passes
//console.log(dayjs('04-20-2021').isValid()); // m-d-y passes
//console.log(dayjs('2021/04/20').isValid()); // y/m/d passes
//console.log(dayjs('04/20/2021').isValid()); // m/d/y passes

//console.log(dayjs('04/20').isValid()); // m/d passes
//console.log(dayjs('20 4').isValid()); // d m fails

// long version date
//console.log( dayjs('Saturday, September 17, 2016').isValid()); // passes
//console.log( dayjs('Saturday, Sept 17, 2016').isValid()); //passes

//console.log( dayjs(null).isValid()); //fails
//console.log( dayjs(undefined).isValid()); //passes
//console.log( dayjs('foo').isValid()); //fails
//console.log( dayjs([]).isValid()); //fails
//console.log( dayjs(NaN).isValid()); //fails

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
    date
}