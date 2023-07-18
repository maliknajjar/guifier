import { Data } from './classes/Data'
import { View } from './classes/View'
import { ParameterSchema } from './types'

import type { Parameters, ParametersInternal } from './types'
import type { DataType } from './enums'

import './guifyStyle.css'

/**
 * Guify class handles converting the passed data into an HTML/GUI representation
 *
 * @param {Parameters} params is the object that has all parameters for the Guify class.
 */
export class Guify {
    readonly params: ParametersInternal
    private data: Data
    private view: View

    constructor (params: Parameters) {
        // validating Guify params
        this.params = ParameterSchema.parse(params)

        // checking if the main element exist
        this.checkIfMainElementExist()

        // parsing data phase
        this.data = new Data(this.params.data, this.params.dataType, this.params)

        // drawing internally data phase
        this.view = new View(this.data, this.params)

        // pasting the drawn data to the element with the elementId
        this.drawGeneratedHtmlElement()
    }

    /**
     * This function draws the generated htmlElement from the data into params element
     */
    public drawGeneratedHtmlElement (): void {
        const el = document.getElementById(this.params.elementId)
        if (el !== null) {
            el.innerHTML = ''
            el.append(this.view.getGeneratedHTML())
        }
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
     */
    public getData (): any {
        return this.data.getData()
    }

    /**
     * This method sets the data. you can use it to change the data shown in the Guify element
     */
    public setData (data: any, dataType: DataType): void {
        // updating the params
        this.params.data = data
        this.params.dataType = dataType

        // parsing data phase
        this.data = new Data(data, dataType, this.params)

        // drawing data phase
        this.view = new View(this.data, this.params)

        // pasting the drawn data to the element with the elementId
        this.drawGeneratedHtmlElement()
    }
}
