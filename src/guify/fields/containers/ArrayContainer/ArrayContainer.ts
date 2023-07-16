import './arrayContainerStyle.css'

import type { Parameters, Property } from '../../../types'
import type { Field } from '../../../fields/Field/Field'
import type { ObjectContainer } from '../../../fields/containers/ObjectContainer/ObjectContainer'
import type { Data } from '../../../classes/Data'

import { Container } from '../Container/Container'
import { fieldsMetaData, getFieldInstance, isOdd } from '../../../utils'

import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import { PrimitiveTypes } from '../../../enums'
import { Dialog } from '../../../dialogue/dialog'

/**
 * Represents peroperty of type array
 */
export class ArrayContainer extends Container {
    public static fieldLabelName: string = 'Array'
    public numberOfLevels: number = 0
    public contentBody: HTMLElement = document.createElement('div')

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
     * This function validates the _rules of the property object
     */
    public getFieldLabelName (): string {
        return ArrayContainer.fieldLabelName
    }

    /**
     * this function is responsible for drawing the HTMLElement array
     *
     * @returns {HTMLElement} html element array
     */
    public draw (): HTMLElement {
        // creating the body of the container
        const guifyArrayContainerbody = document.createElement('div')
        guifyArrayContainerbody.classList.add('guifyArrayContainerbody')

        if (this.containerInFirstLevel()) {
            guifyArrayContainerbody.style.overflowY = 'auto'
        }

        // drawing the fields or containers that resides inside this container
        const array: [any] = this.property._value

        // checking if the array is empty
        if (!isEmpty(array)) {
            for (const key in array) {
                const property: Property = array[key]
                guifyArrayContainerbody.append(this.drawElement(property))
                this.containerLength++
            }
        } else {
            guifyArrayContainerbody.append(this.drawEmptyContent(true))
        }

        this.contentBody = guifyArrayContainerbody

        return guifyArrayContainerbody
    }

    /**
     * This function is responsible for drawing an array element
     *
     * @returns {HTMLElement} html element object
     */
    private drawElement (property: Property): HTMLElement | DocumentFragment {
        const guifyArrayFieldContainer = document.createElement('div')
        guifyArrayFieldContainer.classList.add('guifyArrayFieldContainer')
        guifyArrayFieldContainer.dataset.elementIndex = `${this.containerLength}`
        if (isOdd(this.containerLength)) {
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
        indexLabelElement.innerHTML = `${labelName as number + 1}`
        labelContainer.append(indexLabelElement)

        guifyArrayFieldContainer.append(labelContainer)

        // container used to wrap field element with a div container
        const fieldInnerContainer = document.createElement('div')
        fieldInnerContainer.classList.add('guifyArrayfieldInnerContainer')

        const field = getFieldInstance(property, this.data, this.params)
        let fieldElement
        if (field.isCollapsible) {
            fieldElement = this.drawCollapsibleArrayElement(field as Container, this.containerLength)
            guifyArrayFieldContainer.classList.add('guifyContainerFieldType')
        } else {
            field.showSecondaryColors = this.showSecondaryColors
            fieldElement = field.draw()
            guifyArrayFieldContainer.classList.add('guifyBaseFieldType')
        }

        fieldInnerContainer.append(fieldElement)

        guifyArrayFieldContainer.append(fieldInnerContainer)

        if (field.isCollapsible) {
            const fragment = document.createDocumentFragment()
            fragment.append(guifyArrayFieldContainer)
            if (this.containerLength === this.property._value.length - 1) {
                fragment.append(this.drawCollapsibleArrayElementContent(field, true))
            } else {
                fragment.append(this.drawCollapsibleArrayElementContent(field))
            }

            const containerHeaderButtons = guifyArrayFieldContainer.querySelector('.guifyContainerHeaderButtons') as HTMLElement
            Container.showHeaderButtonsWhenHovering(containerHeaderButtons, guifyArrayFieldContainer)
            ArrayContainer.addingEventListenerForHeaderButtons(containerHeaderButtons, this, field as ArrayContainer | ObjectContainer)

            return fragment
        }

        // TODO: add the delete button to the field element here
        const deleteButton = this.drawArrayFieldDeleteButton()
        guifyArrayFieldContainer.append(deleteButton)

        return guifyArrayFieldContainer
    }

    /**
     * This function is responsible for drawing the button in the array field element
     *
     * @returns {HTMLElement} html element object
     */
    private drawArrayFieldDeleteButton (): HTMLElement {
        const deleteButton = this.drawDeleteButton()
        deleteButton.classList.add('guifyArrayFieldDeleteButton')

        deleteButton.addEventListener('click', () => {
            const elementIndex = parseInt(deleteButton.parentElement?.dataset.elementIndex as string)
            this.deleteElement(elementIndex)
        })

        return deleteButton
    }

    /**
     * This function is responsible for drawing an array element that is Collapsible
     *
     * @returns {HTMLElement} html element object
     */
    private drawCollapsibleArrayElement (field: Container, elementIndex: number): HTMLElement {
        const collapsibleElement = document.createElement('div')
        collapsibleElement.classList.add('guifyArrayCollapsibleElement')

        // drawing the field label name
        const fieldLabelName = document.createElement('div')
        fieldLabelName.classList.add('guifyFieldLabelName')
        fieldLabelName.innerHTML = field.getFieldLabelName()
        collapsibleElement.append(fieldLabelName)

        const guifyContainerHeaderButtons = field.drawContainerHeaderButtons(true)

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
        if (field.getFieldLabelName() !== 'Array') {
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
            collapsibleElementContent.append(arrayField.draw())
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
     * This function is responsible adding event listeners to the header buttons of an object container
     */
    protected static addingEventListenerForHeaderButtons (containerHeaderButtons: HTMLElement, parentObjectContainer: ArrayContainer, childContainer: ObjectContainer | ArrayContainer): void {
        if (containerHeaderButtons !== null) {
            const buttons = Array.from(containerHeaderButtons.children) as HTMLElement[]
            buttons.forEach((button) => {
                switch (button.innerHTML) {
                    case 'expand_less':
                        button.addEventListener('click', () => {
                            const bodyElement = button.parentElement?.parentElement?.parentElement?.parentElement?.nextElementSibling as HTMLDivElement
                            button.classList.toggle('guifyRotate')
                            bodyElement.classList.toggle('guifyNoneDisplay')
                        })
                        break
                    case 'delete':
                        button.addEventListener('click', (e: MouseEvent) => {
                            const deleteButton = e.target as HTMLElement
                            const elementContainer = deleteButton.parentElement?.parentElement?.parentElement?.parentElement
                            const elementIndex = elementContainer?.dataset.elementIndex as string
                            parentObjectContainer.deleteElement(parseInt(elementIndex))
                        })
                        break
                    case 'add':
                        button.addEventListener('click', () => {
                            const propertyExample: Property = {
                                _path: [...childContainer.property._path, childContainer.containerLength],
                                _key: childContainer.containerLength,
                                _valueType: PrimitiveTypes.String,
                                _value: 'nothing man',
                                _fieldType: 'text'
                            }
                            if (childContainer.getFieldLabelName() === 'Object') {
                                (childContainer as ObjectContainer).addProperty(propertyExample)
                            } else if (childContainer.getFieldLabelName() === 'Array') {
                                (childContainer as ArrayContainer).addElement(propertyExample)
                            }
                        })
                        break
                    default:
                        break
                }
            })
        }
    }

    /**
     * This function is responsible for deleting an element in an array container in the ui
     */
    private deleteElement (elementIndex: number): void {
        // removing the dom
        const guifyArrayFieldContainers = this.getArrayFieldContainers()
        if (guifyArrayFieldContainers[elementIndex].classList.contains('guifyContainerFieldType')) {
            guifyArrayFieldContainers[elementIndex].nextElementSibling?.remove()
        }
        guifyArrayFieldContainers[elementIndex].remove()

        // remove the element from the data
        const path = cloneDeep(this.property._path)

        // adding the index element to the path
        path.push(elementIndex)
        this.data.removeProperty(path)

        // redrawing the index label and the background color of the array elements in the html
        this.resetElementsUiInArrayContainer()

        // reducing the counter
        this.containerLength--
        if (this.containerLength === 0) {
            this.contentBody.append(this.drawEmptyContent())
        }
    }

    /**
     * This function lets the user add an element by showing a prompt to him
     */
    public async letUserAddAnElement (container: ArrayContainer): Promise<void> {
        const cards = []
        for (const key in fieldsMetaData) {
            const element = fieldsMetaData[key]
            if (element.staticObject.isBaseField) {
                cards.push({
                    icon: element.staticObject.fieldIcon,
                    text: element.staticObject.fieldLabelName
                })
            }
        }
        const dialogData = {
            'Field Type': {
                _fieldType: 'cardSelect',
                _params: {
                    cards
                },
                _value: 'wowowo'
            }
        }
        const dialogParams = {
            elementId: container.params.elementId,
            dialogTitle: 'New Field'
        }
        const data = await Dialog.get(dialogData, dialogParams)

        // adding the element
        if (data !== null) {
            const propertyExample: Property = {
                _path: [...container.property._path, container.containerLength],
                _key: container.containerLength,
                _valueType: PrimitiveTypes.String,
                _value: '',
                _fieldType: data['Field Type'],
                _rules: undefined,
                _params: undefined
            }
            container.addElement(propertyExample)
        }
    }

    /**
     * This function is responsible for adding a property in an object container
     */
    public addElement (property: Property): void {
        if (this.containerLength === 0) {
            this.contentBody.innerHTML = ''
        }
        this.contentBody.append(this.drawElement(property))
        this.containerLength++
    }

    /**
     * This function is responsible for redrawing Elements in an Array Container
     */
    private resetElementsUiInArrayContainer (): void {
        const guifyArrayFieldContainers = this.getArrayFieldContainers()
        guifyArrayFieldContainers.forEach((element, index) => {
            // resetting the index numbers of the elements in the array container
            const indexLabel = element.querySelector('.guifyArrayIndexLabel')
            if (indexLabel !== null) {
                indexLabel.innerHTML = `${index + 1}`
            }
            // resetting the background colors for the elements in the array container
            element.classList.remove('guifyOddBackground')
            if (isOdd(index)) {
                element.classList.add('guifyOddBackground')
            }
            // resetting the index element in the dataset of the array element container
            element.dataset.elementIndex = `${index}`
        })
    }

    /**
     * This function is responsible for getting all the ArrayFieldContainers
     */
    private getArrayFieldContainers (): HTMLElement[] {
        const guifyArrayFieldContainers = [] as HTMLElement[]
        for (let index = 0; index < this.contentBody.children.length; index++) {
            if (this.contentBody.children[index].classList.contains('guifyArrayFieldContainer')) {
                guifyArrayFieldContainers.push(this.contentBody.children[index] as HTMLElement)
            }
        }

        return guifyArrayFieldContainers
    }
}
