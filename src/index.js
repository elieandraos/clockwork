const required = function(value)  {
    if( Array.isArray(value) && value.length === 0 )
        return false;
    else
        return ![ null, undefined, '' ].includes(value);
}

const string = function(value) {
    return typeof value === 'string';
}

module.exports = {
    required,
    string
}