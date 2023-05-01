import type * as z from 'zod'

import type { GuifyParameterSchema } from '../schemas/guify'

/**
 * Represents a javascript object with any structure
 */
export type AnyObject = Record<any, any>

/**
 * Represents an error in Guify Context
 */
export interface GuifyErrors {
    code: string
    message: string
}

/**
 * Represents the object that gets passed to the instantiated Guify object
 *
 * @property {string} elementId is element's id.
 * @property {string} data is the data you want to guify.
 * @property {GuifyDataType} dataType is the type of the passed data.
 */
export type GuifyParameters = z.infer<typeof GuifyParameterSchema>
