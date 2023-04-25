/**
 * A function that returns the type of any value passed to it<br>
 * These are the list of the supported types by this function:<br>
 * - "string": for string values
 * - "number": for numeric values, including integers, decimals, and the special values Infinity and -Infinity
 * - "boolean": for boolean values (true or false)
 * - "object": for object values, including arrays and non-null objects
 * - "array": for arrays
 * - "null": for the value null
 * - "undefined": for the value undefined
 * - "NaN": for the special value NaN
 *
 * @param {any} value is the variable or property you want to get it's type
 * @returns {string} the type
 */
export function getType (value: any): string {
    const type = typeof value

    if (type === 'object') {
        if (Array.isArray(value)) {
            return 'array'
        } else if (value === null) {
            return 'null'
        } else {
            return 'object'
        }
    } else if (type === 'number' && isNaN(value)) {
        return 'NaN'
    } else {
        return type
    }
}
