import './fieldStyle.css'

import type { Property } from '../../types'
import type { Data } from '../../classes/Data'

export abstract class Field {
    protected data: Data
    protected property: Property
    /**
     * every field has two colors theme to make them more visible when they are nested
     * this property decides which color theme to use
     */
    public showSecondaryColors: boolean = false
    /**
     * this property tells if the current field is a big field (if it requires more than 45px height) like object, array or a rich text field
     */
    public isCollapsible = false

    public abstract FieldLabelName: string

    constructor (property: Property, data: Data) {
        this.property = property
        this.data = data
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
     * This function is responsible for drawing the collapsible fields wihtout a container.
     *  This function needs to be overridden by a child field class and it created to be used
     * with arrays containers
     */
    public drawCollapsibleFieldContentWithoutContainer (): HTMLElement {
        const el = document.createElement('p')
        el.innerHTML = 'drawCollapsibleFieldContentWithoutContainer method is not defined in this field'
        return el
    }
}
