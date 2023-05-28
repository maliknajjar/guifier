import type * as z from 'zod'

import { PrimitiveTypes } from './enums'
import type { ParameterSchema } from './schemas'

/**
 * Represents a javascript object with any structure
 */
export type AnyObject = Record<any, any>

/**
 * Represents the object that gets passed to the instantiated Guify object
 *
 * @property {string} elementId is element's id.
 * @property {string} data is the data you want to guify.
 * @property {DataType} dataType is the type of the passed data.
 */
export type Parameters = z.infer<typeof ParameterSchema>

/**
 * Represents the guify property contents
 */
export interface Property {
    _path: string[]
    _key: string
    _valueType: PrimitiveTypes
    _value: any
    _fieldType: string
    _rules?: string[] | AnyObject[]
    _params?: AnyObject[]
}
export const defaultProperty: Property = {
    _path: [],
    _key: 'null',
    _valueType: PrimitiveTypes.String,
    _value: 'null',
    _fieldType: 'null',
    _rules: undefined,
    _params: undefined
}
