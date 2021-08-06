export function is_object(value) {
    return !(!value || Array.isArray(value) || typeof value !== 'object' || value.constructor !== Object);
}

export function is_empty_object(value) {
    return is_object(value) && Object.keys(value).length === 0;
}