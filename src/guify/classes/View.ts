import type { Data } from './Data'
import { ObjectContainer } from '../containers/ObjectContainer/ObjectContainer'
import { ArrayContainer } from '../containers/ArrayContainer/ArrayContainer'

/**
 * Represents object that will handle generating html from the data
 */
export class View {
    public data: Data
    private generatedHTML: HTMLElement = document.createElement('null')

    constructor (data: Data) {
        this.data = data

        // drawing the data
        this.drawData()
    }

    /**
     * This method returns the HTMLElement based on the data
     */
    private drawData (): void {
        console.log('starting drawing data')
        if (this.data.parsedData._valueType === 'object') {
            // if the root is an object
            const objectContainer = new ObjectContainer(this.data.parsedData)
            this.generatedHTML = objectContainer.draw()
        } else {
            // if the root is an array
            const arrayContainer = new ArrayContainer(this.data.parsedData)
            this.generatedHTML = arrayContainer.draw()
        }
    }

    /**
     * This method returns the generated HTMLElement
     */
    public getGeneratedHTML (): HTMLElement {
        return this.generatedHTML
    }
}
