import type * as z from 'zod'

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
    _type: string
    _value: any | GuifyProperty[]
}
export const defaultGuifyProperty: GuifyProperty = {
    _type: 'nothing',
    _value: 'nothing'
}
