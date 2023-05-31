import './objectContainerStyle.css'

import type { Property } from '../../types'
import { PrimitiveTypes } from '../../enums'

import { ArrayContainer } from '../ArrayContainer/ArrayContainer'
import { Container } from '../Container'
import { getFieldInstance } from '../../utils'

/**
 * Represents peroperty of type object
 */
export class ObjectContainer extends Container {
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
        const guifyObjectContainerbody = document.createElement('div')
        guifyObjectContainerbody.classList.add('guifyObjectContainerbody')
        objectContainer.append(guifyObjectContainerbody)

        // adding guifyFullHeight class to stretch height if it was in the first level
        if (this.containerInFirstLevel()) {
            objectContainer.classList.add('guifyFullHeight')
        }

        // drawing the fields or containers that resides inside this container
        const object = this.property._value
        for (const key in object) {
            const property = object[key]
            let propertyElement
            if (property._valueType === PrimitiveTypes.Object) {
                const childObjectContainer = new ObjectContainer(property)
                // make this child object use different set of colors that the current one
                childObjectContainer.showSecondaryColors = !this.showSecondaryColors
                propertyElement = childObjectContainer.draw()
            } else if (property._valueType === PrimitiveTypes.Array) {
                const childArrayContainer = new ArrayContainer(property)
                propertyElement = childArrayContainer.draw()
            } else {
                const field = getFieldInstance(property)
                field.showSecondaryColors = this.showSecondaryColors
                propertyElement = field.draw()
            }
            propertyElement.classList.add('guifyFieldContainer')
            guifyObjectContainerbody.append(propertyElement)
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
}
