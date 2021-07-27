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
    return string(value) ? new RegExp("^[A-Za-z]+$").test(value.toLowerCase()) : false;
}

module.exports = {
    required,
    string,
    array,
    integer,
    numeric,
    alpha
}