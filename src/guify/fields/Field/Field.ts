import './fieldStyle.css'

import type { Property } from '../../types'

export abstract class Field {
    protected property: Property
    public showSecondaryColors: boolean = false

    constructor (property: Property) {
        this.property = property
    }

    /**
     * This function validates the _params of the property object
     */
    protected abstract validateParams (): void

    /**
     * This function validates the _rules of the property object
     */
    protected abstract validateRules (): void

    /**
     * This function is responsible for drawing the HTMLElement object
     *
     * @returns {HTMLElement} html element object
     */
    public abstract draw (): HTMLElement

    /**
     * This function is responsible for setting the new value to the property
     */
    protected setValue (newValue: any): void {
        this.property._value = newValue
    }

    /**
     * This function validates the _rules of the property object
     */
    protected drawFieldLabel (): HTMLElement {
        const labelName = this.property._key
        const labelContainer = document.createElement('div')
        labelContainer.classList.add('guifyLabelContainer')
        labelContainer.innerHTML = labelName

        return labelContainer
    }
}
