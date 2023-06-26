import type { Data } from './Data'
import type { Container } from '../fields/containers/Container/Container'

import { getFieldInstance } from '../utils'

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
        const containerField = getFieldInstance(this.data.parsedData, this.data) as Container
        const containerElement = containerField.drawContentWithContainer(containerField)
        // TODO: add event listener for the header buttons from an object Container function here
        // TODO: its better to create a specific static method for root object whether its an array or an object
        // const containerHeaderButtons = containerElement.querySelector('.guifyContainerHeaderButtons')
        // containerField.addingEventListenerForHeaderButtons(containerHeaderButtons, this, field as ObjectContainer | ArrayContainer)
        this.generatedHTML = containerElement
    }

    /**
     * This method returns the generated HTMLElement
     */
    public getGeneratedHTML (): HTMLElement {
        return this.generatedHTML
    }
}
