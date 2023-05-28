import type { AnyObject, Property } from './types'
import type { Field } from './fields/Field/Field'

import { PrimitiveTypes } from './enums'
import { TextField } from './fields/TextField/TextField'
import { BooleanField } from './fields/BooleanField/BooleanField'

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

/**
 * Merges two objects together, returning a new object that contains all properties from both
 * objects, with properties from obj2 taking precedence over obj1 in case of conflicts. However,
 * only properties from obj2 that do not already exist in obj1 will be included in the result.
 *
 * @param obj1 The first object to merge.
 * @param obj2 The second object to merge.
 *
 * @returns A new object containing all properties from obj1 and obj2, with properties from obj2
 * taking precedence over obj1 in case of conflicts, but only including properties from obj2 that
 * do not already exist in obj1.
 */
export function mergeObjectsOnlyNewProperties (obj1: AnyObject, obj2: AnyObject): any {
    return {
        ...obj1,
        ...Object.fromEntries(Object.entries(obj2).filter(([key]) => !(key in obj1)))
    }
}

/**
 * A function that gets an instance of the field based on the type
 *
 * @param {Property} property is the object you want to check if its empty
 * @returns {Field} instance of the Field
 */
export function getFieldInstance (property: Property): Field {
    switch (property._fieldType) {
        case 'text':
            return new TextField(property)
        case 'number':
            break
        case 'boolean':
            return new BooleanField(property)
        case 'null':
            break
        case 'undefined':
            break
        case 'notNumber':
            break
        default:
            break
    }
}
