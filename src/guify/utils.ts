import type { AnyObject } from './types'
import { PrimitiveTypes } from './enums'

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
export function getType (value: any): PrimitiveTypes {
    const type = typeof value

    if (type === PrimitiveTypes.Object) {
        if (Array.isArray(value)) {
            return PrimitiveTypes.Array
        } else if (value === null) {
            return PrimitiveTypes.Null
        } else {
            return PrimitiveTypes.Object
        }
    } else if (type === 'number' && isNaN(value)) {
        return PrimitiveTypes.NaN
    } else {
        return type as PrimitiveTypes
    }
}

/**
 * A function that tells you wether an object is empty or not<br>
 *
 * @param {any} obj is the object you want to check if its empty
 * @returns {boolean} weather the object is empty or not
 */
export function isObjectEmpty (obj: AnyObject): boolean {
    return Object.keys(obj).length === 0
}

/**
 * A function that tells you wether an array is empty or not<br>
 *
 * @param {any} arr is the array you want to check if its empty
 * @returns {boolean} weather the array is empty or not
 */
export function isArrayEmpty (arr: unknown[]): boolean {
    return arr.length === 0
}
