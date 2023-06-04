import './arrayContainerStyle.css'

import type { Property } from '../../types'
import { PrimitiveTypes } from '../../enums'

import { ObjectContainer } from '../ObjectContainer/ObjectContainer'
import { Container } from '../Container'
import { getFieldInstance } from '../../utils'

/**
 * Represents peroperty of type array
 */
export class ArrayContainer extends Container {
    constructor (property: Property) {
        super(property)
        this.validateParams()
        this.validateRules()
    }

    /**
     * This function validates the _params of the property array
     */
    protected validateParams (): void {

    }

    /**
     * This function validates the _rules of the property array
     */
    protected validateRules (): void {

    }

    /**
     * this function is responsible for drawing the HTMLElement array
     *
     * @returns {HTMLElement} html element array
     */
    public draw (): HTMLElement {
        // creating the container div
        const arrayContainer = document.createElement('div')
        arrayContainer.classList.add('guifyArrayContainer')
        if (this.showSecondaryColors) {
            arrayContainer.classList.add('guifySecondaryBgColor')
        } else {
            arrayContainer.classList.add('guifyPrimaryBgColor')
        }

        // creating the header of the container
        arrayContainer.append(this.drawHeader())

        // creating a wrapping over the guifyArrayContainerbody
        const guifyArrayMainContainerbody = document.createElement('div')
        guifyArrayMainContainerbody.classList.add('guifyArrayMainContainerbody')

        // creating an array level element
        const guifyArrayLevelElement = document.createElement('div')
        guifyArrayLevelElement.classList.add('guifyArrayLevelElement')
        guifyArrayMainContainerbody.append(guifyArrayLevelElement)

        // creating the body of the container
        const guifyArrayContainerbody = document.createElement('div')
        guifyArrayContainerbody.classList.add('guifyArrayContainerbody')
        guifyArrayMainContainerbody.append(guifyArrayContainerbody)

        arrayContainer.append(guifyArrayMainContainerbody)

        // adding guifyFullHeight class to stretch height if it was in the first level
        if (this.containerInFirstLevel()) {
            arrayContainer.classList.add('guifyFullHeight')
        }

        // drawing the fields or containers that resides inside this container
        const array = this.property._value
        for (const key in array) {
            const property: Property = array[key]
            let propertyElement
            if (property._valueType === PrimitiveTypes.Object) {
                const childObjectContainer = new ObjectContainer(property)
                // make this child object use different set of colors that the current one
                childObjectContainer.showSecondaryColors = !this.showSecondaryColors
                propertyElement = childObjectContainer.draw()
            } else if (property._valueType === PrimitiveTypes.Array) {
                const childArrayContainer = new ArrayContainer(property)
                childArrayContainer.showSecondaryColors = !this.showSecondaryColors
                propertyElement = childArrayContainer.draw()
            } else {
                propertyElement = this.drawArrayElement(property, parseInt(property._key), array.length)
            }

            guifyArrayContainerbody.append(propertyElement)
        }

        return arrayContainer
    }

    /**
     * This function is responsible for drawing the header for the object
     *
     * @returns {HTMLElement} html element object
     */
    private drawHeader (): HTMLElement {
        const arrayName = this.property._key
        const guifyObjectContainerHeader = document.createElement('div')
        guifyObjectContainerHeader.classList.add('guifyObjectContainerHeader')
        guifyObjectContainerHeader.innerHTML = arrayName

        return guifyObjectContainerHeader
    }

    /**
     * This function is responsible for drawing an array element
     *
     * @returns {HTMLElement} html element object
     */
    private drawArrayElement (property: Property, index: number, length: number): HTMLElement {
        const guifyArrayFieldContainer = document.createElement('div')
        guifyArrayFieldContainer.classList.add('guifyArrayFieldContainer')

        // append the key label to the property div in an Array
        const labelName = property._key
        const labelContainer = document.createElement('div')
        labelContainer.classList.add('guifyArrayLabelContainer')

        // adding label div and two divs for the lines
        const indexLabelElement = document.createElement('div')
        indexLabelElement.classList.add('guifyArrayIndexLabel')
        indexLabelElement.innerHTML = labelName
        labelContainer.append(indexLabelElement)

        guifyArrayFieldContainer.append(labelContainer)

        const field = getFieldInstance(property)
        field.showSecondaryColors = this.showSecondaryColors
        const fieldElement = field.draw()

        // wrap field element with a div container
        const fieldInnerContainer = document.createElement('div')
        fieldInnerContainer.classList.add('guifyArrayfieldInnerContainer')
        fieldInnerContainer.append(fieldElement)

        guifyArrayFieldContainer.append(fieldInnerContainer)
        return guifyArrayFieldContainer
    }
}
