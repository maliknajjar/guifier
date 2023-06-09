import './arrayContainerStyle.css'

import type { Property } from '../../types'
import type { Field } from '../../fields/Field/Field'

import { Container } from '../Container'
import { getFieldInstance } from '../../utils'

/**
 * Represents peroperty of type array
 */
export class ArrayContainer extends Container {
    public FieldLabelName: string = 'Array'
    public numberOfLevels: number = 0

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

        // adding guifyFullHeight class to stretch height if it was in the first level
        if (this.containerInFirstLevel()) {
            arrayContainer.classList.add('guifyFullHeight')
        }

        // creating the header of the container
        arrayContainer.append(this.drawHeader())

        arrayContainer.append(this.drawArrayContent())

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
        guifyObjectContainerHeader.classList.add('guifyArrayContainerHeader')
        if (this.showSecondaryColors) {
            guifyObjectContainerHeader.classList.add('guifySecondaryBgColor')
        } else {
            guifyObjectContainerHeader.classList.add('guifyPrimaryBgColor')
        }
        guifyObjectContainerHeader.innerHTML = arrayName

        return guifyObjectContainerHeader
    }

    /**
     * This function is responsible for drawing the content of an array
     *
     * @returns {HTMLElement} html element object
     */
    private drawArrayContent (): HTMLElement {
        // creating a wrapping over the guifyArrayContainerbody
        const guifyArrayMainContainerbody = document.createElement('div')
        guifyArrayMainContainerbody.classList.add('guifyArrayMainContainerbody')

        // creating the body of the container
        const guifyArrayContainerbody = document.createElement('div')
        guifyArrayContainerbody.classList.add('guifyArrayContainerbody')
        guifyArrayMainContainerbody.append(guifyArrayContainerbody)

        // drawing the fields or containers that resides inside this container
        const array = this.property._value
        for (const key in array) {
            const property: Property = array[key]
            guifyArrayContainerbody.append(this.drawArrayElement(property, parseInt(key)))
        }

        return guifyArrayContainerbody
    }

    /**
     * This function is responsible for drawing an array element
     *
     * @returns {HTMLElement} html element object
     */
    private drawArrayElement (property: Property, arrayElementIndex: number): HTMLElement | DocumentFragment {
        const guifyArrayFieldContainer = document.createElement('div')
        guifyArrayFieldContainer.classList.add('guifyArrayFieldContainer')

        guifyArrayFieldContainer.append(this.drawArrayLevels(this.numberOfLevels))

        // append the key label to the property div in an Array
        const labelName = property._key
        const labelContainer = document.createElement('div')
        labelContainer.classList.add('guifyArrayLabelContainer')
        if (this.numberOfLevels > 0) {
            labelContainer.classList.add('guifyArrayLabelContainerForUpperLevel')
            const line = document.createElement('div')
            line.classList.add('guifyArrayLabelLineForUpperLevel')
            labelContainer.append(line)
        }

        // adding label div and two divs for the lines
        const indexLabelElement = document.createElement('div')
        indexLabelElement.classList.add('guifyArrayIndexLabel')
        if (this.showSecondaryColors) {
            indexLabelElement.classList.add('guifyPrimaryBgColor')
            indexLabelElement.style.outline = '4px solid white'
        } else {
            indexLabelElement.classList.add('guifySecondaryBgColor')
            indexLabelElement.style.outline = '4px solid var(--primary-bg-color)'
        }
        indexLabelElement.innerHTML = labelName
        labelContainer.append(indexLabelElement)

        guifyArrayFieldContainer.append(labelContainer)

        // container used to wrap field element with a div container
        const fieldInnerContainer = document.createElement('div')
        fieldInnerContainer.classList.add('guifyArrayfieldInnerContainer')

        const field = getFieldInstance(property)
        let fieldElement
        if (field.isCollapsible) {
            fieldElement = this.drawCollapsibleArrayElement(field)
        } else {
            field.showSecondaryColors = this.showSecondaryColors
            fieldElement = field.draw()
        }

        fieldInnerContainer.append(fieldElement)

        guifyArrayFieldContainer.append(fieldInnerContainer)

        if (field.isCollapsible) {
            const fragment = document.createDocumentFragment()
            fragment.append(guifyArrayFieldContainer)
            if (arrayElementIndex === this.property._value.length - 1) {
                fragment.append(this.drawCollapsibleArrayElementContent(field, true))
            } else {
                fragment.append(this.drawCollapsibleArrayElementContent(field))
            }

            return fragment
        }

        return guifyArrayFieldContainer
    }

    /**
     * This function is responsible for drawing an array element that is Collapsible
     *
     * @returns {HTMLElement} html element object
     */
    private drawCollapsibleArrayElement (field: Field): HTMLElement {
        const collapsibleElement = document.createElement('div')
        collapsibleElement.classList.add('guifyArrayCollapsibleElement')

        // drawing the field label name
        const fieldLabelName = document.createElement('div')
        fieldLabelName.classList.add('guifyFieldLabelName')
        fieldLabelName.innerHTML = field.FieldLabelName
        collapsibleElement.append(fieldLabelName)

        // TODO: drawing the field collapse icon
        const collapseIconElementContainer = document.createElement('div')
        const collapseIconElement = document.createElement('i')
        collapseIconElement.classList.add('guifyNullFieldIcon')
        collapseIconElement.classList.add('fa-solid')
        collapseIconElement.classList.add('fa-chevron-up')
        collapseIconElementContainer.append(collapseIconElement)
        collapsibleElement.append(collapseIconElementContainer)

        return collapsibleElement
    }

    /**
     * This function is responsible for drawing the content of an array element that is Collapsible
     *
     * @returns {HTMLElement} html element object
     */
    private drawCollapsibleArrayElementContent (field: Field, lastElement = false): HTMLElement {
        const collapsibleElementContent = document.createElement('div')
        collapsibleElementContent.classList.add('guifyCollapsibleElementContent')
        if (this.showSecondaryColors) {
            collapsibleElementContent.classList.add('guifyPrimaryBgColor')
        } else {
            collapsibleElementContent.classList.add('guifySecondaryBgColor')
        }

        if (lastElement) {
            collapsibleElementContent.style.marginBottom = '0'
            collapsibleElementContent.style.borderBottom = 'none'
            collapsibleElementContent.style.borderRadius = '0 0 7.5px 7.5px'
        }

        if (field.FieldLabelName !== 'Array') {
            // creating the array levels
            collapsibleElementContent.append(this.drawArrayLevels(this.numberOfLevels + 1))
            // creating the inner container
            const collapsibleElementInnerContentContainer = document.createElement('div')
            collapsibleElementInnerContentContainer.classList.add('guifyCollapsibleElementInnerContentContainer')
            collapsibleElementInnerContentContainer.append(field.drawCollapsibleFieldContentWithoutContainer())
            collapsibleElementContent.append(collapsibleElementInnerContentContainer)
        } else {
            const arrayField = (field as unknown as ArrayContainer)
            arrayField.numberOfLevels = this.numberOfLevels + 1
            arrayField.showSecondaryColors = !this.showSecondaryColors
            collapsibleElementContent.append(arrayField.drawArrayContent())
        }

        return collapsibleElementContent
    }

    /**
     * This function is responsible for drawing levels line for the array
     *
     * @returns {HTMLElement} html element object
     */
    private drawArrayLevels (numberOfLevels: number): HTMLElement {
        const arrayLevelsContainer = document.createElement('div')
        arrayLevelsContainer.classList.add('guifyArrayLevelsContainer')
        if (numberOfLevels === 0) {
            numberOfLevels++
        }
        for (let index = 0; index < numberOfLevels; index++) {
            const guifyArrayLevelElement = document.createElement('div')
            guifyArrayLevelElement.classList.add('guifyArrayLevelElement')
            arrayLevelsContainer.append(guifyArrayLevelElement)
        }

        return arrayLevelsContainer
    }
}
