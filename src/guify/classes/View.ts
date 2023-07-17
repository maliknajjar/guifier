import type { Data } from './Data'
import type { ParametersInternal } from '../types'
import type { Container } from '../fields/containers/Container/Container'
import type { ObjectContainer } from '../fields/containers/ObjectContainer/ObjectContainer'
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

        const addButton = guifyMainWrapper.querySelector('.guifyContainerHeaderButtons')?.children[0] as HTMLElement
        addButton.addEventListener('click', () => {
            Promise.resolve().then(async () => {
                if (containerField.getFieldLabelName() === 'Object') {
                    const container = (containerField as ObjectContainer)
                    await container.letUserAddProperty()
                } else if (containerField.getFieldLabelName() === 'Array') {
                    const container = (containerField as ArrayContainer)
                    await container.letUserAddElement()
                }
            }).catch((error) => {
                console.error(error)
            })
        })

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
