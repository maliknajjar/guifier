import { Data } from './classes/Data'
import { View } from './classes/View'
import { parameterSchemaInternal } from './types'

import type { Parameters, ParametersInternal } from './types'
import type { DataType } from './enums'

import './guifierStyle.css'
import { drawError } from './utils'

/**
 * Guifier class handles converting the passed data into an HTML/GUI representation
 *
 * @param {Parameters} params is the object that has all parameters for the Guifier class.
 */
export default class Guifier {
    private readonly params!: ParametersInternal
    private data!: Data
    private view!: View
    private containerElement: HTMLElement | null = null
    private guifierElement: HTMLElement | null = null

    constructor (params: Parameters) {
        try {
            // validating Guifier params
            this.params = parameterSchemaInternal.parse(params)

            // checing if the main element exists
            this.checkIfMainElementExist()

            // setting the data
            this.setData(this.params.data, this.params.dataType)
        } catch (error) {
            console.error(error)
            drawError(params.elementSelector, error)
        }
    }

    /**
     * This function draws the generated htmlElement from the data into params element
     */
    private drawGeneratedHtmlElement (): void {
        if (this.containerElement !== null) {
            this.containerElement.append(this.getGeneratedHtmlElement())
        }
    }

    /**
     * This function throws an error if it didnt find the params element
     */
    private checkIfMainElementExist (): void {
        const mainElement = document.querySelector(this.params.elementSelector)
        if (mainElement === null) {
            throw new Error('Did not find the Main Element')
        }
    }

    /**
     * This function returns the generate htmlElement
     */
    public getGeneratedHtmlElement (): HTMLElement {
        this.guifierElement = this.view.getGeneratedHTML()
        return this.guifierElement
    }

    /**
     * This method gets the current state of the data from the GUI
     */
    public getData (dataType: DataType | string): any {
        return this.data.getData(dataType as DataType)
    }

    /**
     * This method empties the main element
     */
    private emptyThisElement (): void {
        if (this.guifierElement !== null) {
            this.guifierElement.remove()
        }
    }

    /**
     * This method sets new data. you can use it to change the data shown in the Guifier element
     */
    public setData (data: any, dataType: DataType | string): void {
        try {
            this.containerElement = document.querySelector(this.params.elementSelector)
            this.params.data = data
            this.params.dataType = dataType as DataType
            this.data = new Data(data, dataType as DataType, this.params)
            this.view = new View(this.data, this.params)
            this.emptyThisElement()
            this.drawGeneratedHtmlElement()
        } catch (error) {
            console.error(error)
            drawError(this.params.elementSelector, error)
        }
    }
}
