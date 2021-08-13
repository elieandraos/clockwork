export function is_object(value) {
    return !(!value || Array.isArray(value) || typeof value !== 'object' || value.constructor !== Object);
}

export function is_empty_object(value) {
    return is_object(value) && Object.keys(value).length === 0;
}

export const defaultErrorMessages = {
    after: 'This field must be a date after "{param}"',
    after_or_equal: 'This field must be a date after or equal to "{param}"',
    alpha: 'This field must only contain letters',
    alpha_dash: 'This field must only contain letters, dashes and underscores',
    alpha_numeric: 'This field must only contain letters and numbers',
    array: 'This field must be an array',
    before: 'This field must be a date before "{param}"',
    before_or_equal: 'This field must be a date before or equal to "{param}"',
    boolean: 'This field must be boolean',
    date: 'This field must be a valid date',
    different: 'This field must be different than "{param}"',
    email: 'This field must be a valid email.',
    ens_with: 'This field must end with "{param}"',
    integer: 'This field must be a number.',
    is_in: 'This field must be one of "{param}"',
    json: 'This field must be a json object',
    leap_year: 'This date must be a leap year',
    matches_regex: 'This field must match the regex "{param}"',
    max: 'This field must not be greater than "{param}"',
    min: 'This field must not be less than "{param}"',
    not_in: 'This field must not be one of "{param}"',
    numeric: 'This field must be numeric',
    required: 'This field is required',
    same: 'This field must be the same as "{param}"',
    size: 'The field length must be "{param}"',
    starts_with: 'This field must start with "{param}"',
    string: 'This field must be a string',
    today: 'This date must be today',
    tomorrow: 'This date must be tomorrow',
    url: 'This field must be a valid url',
    uuid: 'This field must be a valid uuid',
}