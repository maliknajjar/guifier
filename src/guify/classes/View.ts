import type { Data } from './Data'
import type { Parameters } from '../types'
import type { Container } from '../fields/containers/Container/Container'

import { getFieldInstance } from '../utils'

/**
 * Represents object that will handle generating html from the data
 */
export class View {
    public data: Data
    readonly params: Parameters
    private generatedHTML: HTMLElement = document.createElement('null')

    constructor (data: Data, params: Parameters) {
        // add guify params
        this.params = params

        this.data = data

        // drawing the data
        this.drawData()
    }

    /**
     * This method returns the HTMLElement based on the data
     */
    private drawData (): void {
        // adding a wrapper on top of the generated container
        const guifyMainWrapper = document.createElement('div')
        guifyMainWrapper.classList.add('guifyMainWrapper')

        // drawing the first Container
        const containerField = getFieldInstance(this.data.parsedData, this.data, this.params) as Container
        if (this.params.flipBackgroundColors) {
            containerField.showSecondaryColors = !containerField.showSecondaryColors
        }
        let containerElement
        if (this.params.withoutContainer) {
            const drawnElement = containerField.draw()
            containerElement = drawnElement
        } else {
            containerElement = containerField.drawContentWithContainer()
        }
        guifyMainWrapper.append(containerElement)

        // TODO: add event listener for the header buttons from an object Container function here
        // TODO: its better to create a specific static method for root object whether its an array or an object
        // const containerHeaderButtons = containerElement.querySelector('.guifyContainerHeaderButtons')
        // containerField.addingEventListenerForHeaderButtons(containerHeaderButtons, this, field as ObjectContainer | ArrayContainer)

        this.generatedHTML = guifyMainWrapper
    }

    /**
     * This method returns the generated HTMLElement
     */
    public getGeneratedHTML (): HTMLElement {
        return this.generatedHTML
    }
}
