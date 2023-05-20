import { Data } from './classes/Data'
import { View } from './classes/View'
import type { Parameters } from './types'
import { ParameterSchema } from './schemas'

import './guifyStyle.css'

/**
 * Guify class handles converting the passed data into an HTML/GUI representation
 *
 * @param {Parameters} params is the object that has all parameters for the Guify class.
 */
export class Guify {
    readonly params: Parameters
    readonly data: Data
    readonly view: View

    constructor (params: Parameters) {
        // setting properties
        this.params = params

        // validating Guify params
        ParameterSchema.parse(this.params)

        // checking if the main element exist
        this.checkIfMainElementExist()

        // parsing data phase
        this.data = new Data(this.params.data, this.params.dataType)

        // drawing data phase
        this.view = new View(this.data)

        // inserting generated HTMLElement to element part
        this.appendGeneratedElement()
    }

    private appendGeneratedElement (): void {
        const el = document.getElementById(this.params.elementId)
        el?.append(this.view.getGeneratedElement())
    }

    private checkIfMainElementExist (): void {
        const mainElement = document.getElementById(this.params.elementId)
        if (mainElement === null) {
            throw new Error('Did not find the Main Element')
        }
    }
}
