export function is_object(value) {
    return !(!value || Array.isArray(value) || typeof value !== 'object');
}