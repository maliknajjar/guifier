import './arrayContainerStyle.css'

import type { Property } from '../../../types'
import type { Field } from '../../../fields/Field/Field'
import type { Data } from '../../../classes/Data'

import { Container } from '../Container/Container'
import { getFieldInstance, isOdd } from '../../../utils'
import cloneDeep from 'lodash/cloneDeep'

/**
 * Represents peroperty of type array
 */
export class ArrayContainer extends Container {
    public FieldLabelName: string = 'Array'
    public numberOfLevels: number = 0
    private arrayBody: HTMLElement = document.createElement('div')

    constructor (property: Property, data: Data) {
        super(property, data)
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
        const arrayContainer = this.drawContainer()

        // we add the buttons of the container here
        const guifyContainerHeaderButtons = arrayContainer.querySelector('.guifyContainerHeaderButtons')
        if (guifyContainerHeaderButtons !== null) {
            guifyContainerHeaderButtons.append(this.drawDeleteButton(() => {
                console.log('clicking on the delete button on an array container')
                console.log(this.property._key)
                // this.deleteProperty(this.property._key)
            }))
            guifyContainerHeaderButtons.append(this.drawAddButton(() => {
                console.log('clicking on the add button on an array container')
            }))
            guifyContainerHeaderButtons.append(this.drawCollapseButton())
        }

        this.arrayBody = this.drawArrayContent()

        arrayContainer.append(this.arrayBody)

        return arrayContainer
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
        if (isOdd(arrayElementIndex)) {
            guifyArrayFieldContainer.classList.add('guifyOddBackground')
        }

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
        } else {
            indexLabelElement.classList.add('guifySecondaryBgColor')
        }
        indexLabelElement.innerHTML = `${parseInt(labelName) + 1}`
        labelContainer.append(indexLabelElement)

        guifyArrayFieldContainer.append(labelContainer)

        // container used to wrap field element with a div container
        const fieldInnerContainer = document.createElement('div')
        fieldInnerContainer.classList.add('guifyArrayfieldInnerContainer')

        const field = getFieldInstance(property, this.data)
        let fieldElement
        if (field.isCollapsible) {
            fieldElement = this.drawCollapsibleArrayElement(field, arrayElementIndex)
        } else {
            field.showSecondaryColors = this.showSecondaryColors
            fieldElement = field.draw()
        }

        fieldInnerContainer.append(fieldElement)

        guifyArrayFieldContainer.append(fieldInnerContainer)

        // adding the animation to the buttons for the guifyContainerHeaderButtons
        this.showHeaderButtonsWhenHovering(guifyArrayFieldContainer, true)

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
    private drawCollapsibleArrayElement (field: Field, elementIndex: number): HTMLElement {
        const collapsibleElement = document.createElement('div')
        collapsibleElement.classList.add('guifyArrayCollapsibleElement')

        // drawing the field label name
        const fieldLabelName = document.createElement('div')
        fieldLabelName.classList.add('guifyFieldLabelName')
        fieldLabelName.innerHTML = field.FieldLabelName
        collapsibleElement.append(fieldLabelName)

        const guifyContainerHeaderButtons = document.createElement('div')
        guifyContainerHeaderButtons.classList.add('guifyContainerHeaderButtons')
        // we add the buttons of the container here
        guifyContainerHeaderButtons.append(this.drawDeleteButton(() => {
            this.deleteElement(elementIndex)
        }))
        guifyContainerHeaderButtons.append(this.drawAddButton(() => {
            console.log('clicking on the add button from an array element')
        }))
        guifyContainerHeaderButtons.append(this.drawCollapseButton(true, true))
        collapsibleElement.append(guifyContainerHeaderButtons)

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
        if (!this.showSecondaryColors) {
            collapsibleElementContent.classList.add('guifyPrimaryBgColor')
        } else {
            collapsibleElementContent.classList.add('guifySecondaryBgColor')
        }

        if (lastElement) {
            collapsibleElementContent.style.borderRadius = '0 0 7.5px 7.5px'
        }

        field.showSecondaryColors = this.showSecondaryColors
        if (field.FieldLabelName !== 'Array') {
            // creating the array levels
            collapsibleElementContent.append(this.drawArrayLevels(this.numberOfLevels))
            // creating the inner container
            const collapsibleElementInnerContentContainer = document.createElement('div')
            collapsibleElementInnerContentContainer.classList.add('guifyCollapsibleElementInnerContentContainer')
            collapsibleElementInnerContentContainer.append(field.drawCollapsibleFieldContentWithoutContainer())
            collapsibleElementContent.append(collapsibleElementInnerContentContainer)
        } else {
            const arrayField = (field as unknown as ArrayContainer)
            arrayField.numberOfLevels = this.numberOfLevels + 1
            collapsibleElementContent.append(arrayField.drawArrayContent())
        }

        // hide the collapsible elements
        collapsibleElementContent.classList.add('guifyNoneDisplay')

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

    /**
     * This function is responsible for deleting an element in an array container
     */
    private deleteElement (elementIndex: number): void {
        const guifyArrayFieldContainers = this.getArrayFieldContainers()
        guifyArrayFieldContainers[elementIndex].nextElementSibling?.remove()
        guifyArrayFieldContainers[elementIndex].remove()

        // remove the element from the data
        const path = cloneDeep(this.property._path)

        // adding the index element to the path
        path.push(elementIndex)
        this.data.removeProperty(path)

        // redrawing the index label and the background color of the array elements in the html
        this.redrawElementsInArrayContainer()
    }

    /**
     * This function is responsible for redrawing Elements in an Array Container
     */
    private redrawElementsInArrayContainer (): void {
        const guifyArrayFieldContainers = this.getArrayFieldContainers()
        guifyArrayFieldContainers.forEach((element, index) => {
            console.log(element)
            element.children[1].children[0].innerHTML = `${index + 1}`
            element.classList.remove('guifyOddBackground')
            if (isOdd(index)) {
                element.classList.add('guifyOddBackground')
            }
        })
    }

    /**
     * This function is responsible for getting all the ArrayFieldContainers
     */
    private getArrayFieldContainers (): HTMLElement[] {
        const guifyArrayFieldContainers = [] as HTMLElement[]
        for (let index = 0; index < this.arrayBody.children.length; index++) {
            if (this.arrayBody.children[index].classList.contains('guifyArrayFieldContainer')) {
                guifyArrayFieldContainers.push(this.arrayBody.children[index] as HTMLElement)
            }
        }

        return guifyArrayFieldContainers
    }
}
