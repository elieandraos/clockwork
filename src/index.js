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

module.exports = {
    required,
    string,
    array,
    integer,
    numeric
}