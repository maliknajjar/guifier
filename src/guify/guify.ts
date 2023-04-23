import type { GuifyParameters } from './types/guify'

/**
 * Guify class handles converting the passed data into an HTML/GUI representation
 *
 * @param {GuifyParameters} params is the object that has all parameters for the Guify class.
 */
export class Guify {
    elementId: string

    constructor (params: GuifyParameters) {
        this.elementId = params.elementId
    }
}
