import { GuifyData } from './classes/GuifyData'
import type { GuifyParameters } from './types'
import { GuifyParameterSchema } from './schemas'

/**
 * Guify class handles converting the passed data into an HTML/GUI representation
 *
 * @param {GuifyParameters} params is the object that has all parameters for the Guify class.
 */
export class Guify {
    readonly params: GuifyParameters
    readonly data: GuifyData

    constructor (params: GuifyParameters) {
        // setting properties
        this.params = params

        // validating params
        GuifyParameterSchema.parse(this.params)

        // parsing data phase
        this.data = new GuifyData(this.params.data, this.params.dataType)

        // drawing part
        // TODO

        // logging the results
        // console.log('the raw data is: ')
        // console.log(this.params.data)
        console.log('the parsed data is: ')
        console.log(this.data.data)
    }
}
