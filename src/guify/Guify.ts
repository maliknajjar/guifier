import { Data } from './classes/Data'
import { View } from './classes/View'
import { ParameterSchema } from './types'

import type { Parameters } from './types'

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
        this.params = ParameterSchema.parse(this.params)

        // checking if the main element exist
        this.checkIfMainElementExist()

        // parsing data phase
        this.data = new Data(this.params.data, this.params.dataType, params)

        // drawing data phase
        this.view = new View(this.data, params)
    }

    /**
     * This function draws the generated htmlElement from the data into params element
     */
    public drawGeneratedHtmlElement (): void {
        const el = document.getElementById(this.params.elementId)
        el?.append(this.view.getGeneratedHTML())
    }

    /**
     * This function throws an error if it didnt find the params element
     */
    private checkIfMainElementExist (): void {
        const mainElement = document.getElementById(this.params.elementId)
        if (mainElement === null) {
            throw new Error('Did not find the Main Element')
        }
    }

    /**
     * This function returns the generate htmlElement
     */
    public getGeneratedHtmlElement (): HTMLElement {
        return this.view.getGeneratedHTML()
    }

    /**
     * This method gets the current state of the data from the GUI
     * TODO: by default it should return the data wihtout the meta data
     * TODO: you should create a parameter to enable you to return the data with the meta data too
     */
    public getData (): any {
        return this.data.getData()
    }
}
