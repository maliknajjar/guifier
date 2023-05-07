import type * as z from 'zod'

import { PrimitiveTypes } from './enums'
import type { GuifyParameterSchema } from './schemas'

/**
 * Represents a javascript object with any structure
 */
export type AnyObject = Record<any, any>

/**
 * Represents the object that gets passed to the instantiated Guify object
 *
 * @property {string} elementId is element's id.
 * @property {string} data is the data you want to guify.
 * @property {GuifyDataType} dataType is the type of the passed data.
 */
export type GuifyParameters = z.infer<typeof GuifyParameterSchema>

/**
 * Represents the guify property contents
 */
export interface GuifyProperty {
    _path: string[]
    _key: string
    _valueType: PrimitiveTypes
    _rules?: string[] | AnyObject[]
    _value: any | GuifyProperty[]
}
export const defaultGuifyProperty: GuifyProperty = {
    _path: [],
    _key: 'null',
    _valueType: PrimitiveTypes.String,
    _value: 'null'
}
