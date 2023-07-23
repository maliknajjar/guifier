import type { Data } from './Data'
import type { ParametersInternal } from '../types'
import type { Container } from '../fields/containers/Container/Container'
import { ObjectContainer } from '../fields/containers/ObjectContainer/ObjectContainer'
import type { ArrayContainer } from '../fields/containers/ArrayContainer/ArrayContainer'

import { getFieldInstance } from '../utils'

/**
 * Represents object that will handle generating html from the data
 */
export class View {
    public data: Data
    readonly params: ParametersInternal
    private generatedHTML: HTMLElement = document.createElement('null')

    constructor (data: Data, params: ParametersInternal) {
        // add guifier params
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
        const guifierMainWrapper = document.createElement('div')
        guifierMainWrapper.classList.add('guifierMainWrapper')

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
        guifierMainWrapper.append(containerElement)

        // adding functionality to the add button of the root container
        const containerHeaderButtons = containerElement.querySelector('.guifierContainerHeaderButtons') as HTMLElement
        ObjectContainer.addingEventListenerForHeaderButtons(containerHeaderButtons, containerField as ObjectContainer, containerField as ObjectContainer | ArrayContainer)

        this.generatedHTML = guifierMainWrapper
    }

    /**
     * This method returns the generated HTMLElement
     */
    public getGeneratedHTML (): HTMLElement {
        return this.generatedHTML
    }
}
