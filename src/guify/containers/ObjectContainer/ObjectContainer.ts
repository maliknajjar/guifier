import './objectContainerStyle.css'

import type { Property } from '../../types'

import { Container } from '../Container'
import { getFieldInstance } from '../../utils'

/**
 * Represents peroperty of type object
 */
export class ObjectContainer extends Container {
    public FieldLabelName: string = 'Object'

    constructor (property: Property) {
        super(property)
        this.validateParams()
        this.validateRules()
    }

    /**
     * This function validates the _params of the property object
     */
    protected validateParams (): void {

    }

    /**
     * This function validates the _rules of the property object
     */
    protected validateRules (): void {

    }

    /**
     * this function is responsible for drawing the HTMLElement object
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // creating the container div
        const objectContainer = document.createElement('div')
        objectContainer.classList.add('guifyObjectContainer')
        if (this.showSecondaryColors) {
            objectContainer.classList.add('guifySecondaryBgColor')
        } else {
            objectContainer.classList.add('guifyPrimaryBgColor')
        }

        // creating the header of the container
        objectContainer.append(this.drawHeader())

        // creating the body of the container
        objectContainer.append(this.drawFields())

        // adding guifyFullHeight class to stretch height if it was in the first level
        if (this.containerInFirstLevel()) {
            objectContainer.classList.add('guifyFullHeight')
        }

        return objectContainer
    }

    /**
     * This function is responsible for drawing the header for the object
     *
     * @returns {HTMLElement} html element object
     */
    private drawHeader (): HTMLElement {
        const objectName = this.property._key
        const guifyObjectContainerHeader = document.createElement('div')
        guifyObjectContainerHeader.classList.add('guifyObjectContainerHeader')
        guifyObjectContainerHeader.innerHTML = objectName

        return guifyObjectContainerHeader
    }

    /**
     * This function is responsible for drawing the fields or containers that resides inside this object container
     *
     * @returns {HTMLElement} html element object
     */
    private drawFields (): HTMLElement {
        const guifyObjectContainerbody = document.createElement('div')
        guifyObjectContainerbody.classList.add('guifyObjectContainerbody')
        if (this.containerInFirstLevel()) {
            guifyObjectContainerbody.style.overflowY = 'auto'
        }
        const object = this.property._value
        for (const key in object) {
            const property = object[key]
            const field = getFieldInstance(property)
            let propertyElement
            if (field.isCollapsible) {
                // make this child object use different set of colors that the current one
                field.showSecondaryColors = !this.showSecondaryColors
                propertyElement = field.draw()
            } else {
                const guifyObjectFieldContainer = document.createElement('div')
                guifyObjectFieldContainer.classList.add('guifyObjectFieldContainer')

                const labelName = property._key
                const labelContainer = document.createElement('div')
                labelContainer.classList.add('guifyObjectLabelContainer')
                labelContainer.innerHTML = labelName
                guifyObjectFieldContainer.append(labelContainer)

                field.showSecondaryColors = this.showSecondaryColors
                const fieldElement = field.draw()

                const fieldInnerContainer = document.createElement('div')
                fieldInnerContainer.classList.add('guifyObjectfieldInnerContainer')
                fieldInnerContainer.append(fieldElement)

                guifyObjectFieldContainer.append(fieldInnerContainer)
                propertyElement = guifyObjectFieldContainer
            }

            guifyObjectContainerbody.append(propertyElement)
        }

        return guifyObjectContainerbody
    }

    public drawCollapsibleFieldContentWithoutContainer (): HTMLElement {
        const el = this.drawFields()
        el.style.padding = '0'
        return el
    }
}
