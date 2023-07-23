import './arrayContainerStyle.css'

import type { Property } from '../../../types'
import type { Field } from '../../../fields/Field/Field'
import type { ObjectContainer } from '../../../fields/containers/ObjectContainer/ObjectContainer'
import type { CardSchemaInternal } from '../../CustomFields/CardSelectField/types'

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
    /**
     * this is name of the field internaly
     */
    public static fieldName: string = 'array'

    public static fieldLabelName: string = 'Array'

    /**
     * this is the icon thats shown for users
     */
    public static fieldIcon: string = 'data_array'

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
        const guifierArrayContainerbody = document.createElement('div')
        guifierArrayContainerbody.classList.add('guifierArrayContainerbody')

        if (this.containerInFirstLevel()) {
            guifierArrayContainerbody.style.overflowY = 'auto'
        }

        // drawing the fields or containers that resides inside this container
        const array: [any] = this.property._value

        // checking if the array is empty
        if (!isEmpty(array)) {
            for (const key in array) {
                const property: Property = array[key]
                guifierArrayContainerbody.append(this.drawElement(property))
                this.containerLength++
            }
        } else {
            guifierArrayContainerbody.append(this.drawEmptyContent(true))
            const guifierEmptyContentContianer = guifierArrayContainerbody.querySelector('.guifierEmptyContentContianer')
            guifierEmptyContentContianer?.prepend(this.drawArrayLevels(this.numberOfLevels - 1))
        }

        this.contentBody = guifierArrayContainerbody

        return guifierArrayContainerbody
    }

    /**
     * This function is responsible for drawing an array element
     *
     * @returns {HTMLElement} html element object
     */
    private drawElement (property: Property): HTMLElement | DocumentFragment {
        const guifierArrayFieldContainer = document.createElement('div')
        guifierArrayFieldContainer.classList.add('guifierArrayFieldContainer')
        guifierArrayFieldContainer.dataset.elementIndex = `${this.containerLength}`
        if (isOdd(this.containerLength)) {
            guifierArrayFieldContainer.classList.add('guifierOddBackground')
        }

        guifierArrayFieldContainer.append(this.drawArrayLevels(this.numberOfLevels))

        // append the key label to the property div in an Array
        const labelName = property._key
        const labelContainer = document.createElement('div')
        labelContainer.classList.add('guifierArrayLabelContainer')
        if (this.numberOfLevels > 0) {
            labelContainer.classList.add('guifierArrayLabelContainerForUpperLevel')
            const line = document.createElement('div')
            line.classList.add('guifierArrayLabelLineForUpperLevel')
            labelContainer.append(line)
        }

        // adding label div and two divs for the lines
        const indexLabelElement = document.createElement('div')
        indexLabelElement.classList.add('guifierArrayIndexLabel')
        if (this.showSecondaryColors) {
            indexLabelElement.classList.add('guifierPrimaryBgColor')
        } else {
            indexLabelElement.classList.add('guifierSecondaryBgColor')
        }
        indexLabelElement.innerHTML = `${labelName as number + 1}`
        labelContainer.append(indexLabelElement)

        guifierArrayFieldContainer.append(labelContainer)

        // container used to wrap field element with a div container
        const fieldInnerContainer = document.createElement('div')
        fieldInnerContainer.classList.add('guifierArrayfieldInnerContainer')

        const field = getFieldInstance(property, this.data, this.params)
        let fieldElement
        if (field.isCollapsible) {
            fieldElement = this.drawCollapsibleArrayElement(field as Container)
            guifierArrayFieldContainer.classList.add('guifierContainerFieldType')
        } else {
            field.showSecondaryColors = this.showSecondaryColors
            fieldElement = field.draw()
            guifierArrayFieldContainer.classList.add('guifierBaseFieldType')
        }

        fieldInnerContainer.append(fieldElement)

        guifierArrayFieldContainer.append(fieldInnerContainer)

        if (field.isCollapsible) {
            const fragment = document.createDocumentFragment()
            fragment.append(guifierArrayFieldContainer)
            if (this.containerLength === this.property._value.length - 1) {
                fragment.append(this.drawCollapsibleArrayElementContent(field, true))
            } else {
                fragment.append(this.drawCollapsibleArrayElementContent(field))
            }

            const containerHeaderButtons = guifierArrayFieldContainer.querySelector('.guifierContainerHeaderButtons') as HTMLElement
            Container.showHeaderButtonsWhenHovering(containerHeaderButtons, guifierArrayFieldContainer)
            ArrayContainer.addingEventListenerForHeaderButtons(containerHeaderButtons, this, field as ArrayContainer | ObjectContainer)

            return fragment
        }

        // TODO: add the delete button to the field element here
        const deleteButton = this.drawArrayFieldDeleteButton()
        guifierArrayFieldContainer.append(deleteButton)

        return guifierArrayFieldContainer
    }

    /**
     * This function is responsible for drawing the button in the array field element
     *
     * @returns {HTMLElement} html element object
     */
    private drawArrayFieldDeleteButton (): HTMLElement {
        const deleteButton = this.drawDeleteButton()
        if (this.params.readOnlyMode) {
            deleteButton.style.display = 'none'
        }
        deleteButton.classList.add('guifierArrayFieldDeleteButton')

        deleteButton.addEventListener('click', () => {
            const elementIndex = parseInt(deleteButton.parentElement?.dataset.elementIndex as string)
            this.removeElement(elementIndex)
        })

        return deleteButton
    }

    /**
     * This function is responsible for drawing an array element that is Collapsible
     *
     * @returns {HTMLElement} html element object
     */
    private drawCollapsibleArrayElement (field: Container): HTMLElement {
        const collapsibleElement = document.createElement('div')
        collapsibleElement.classList.add('guifierArrayCollapsibleElement')

        // drawing the field label name
        const fieldLabelName = document.createElement('div')
        fieldLabelName.classList.add('guifierFieldLabelName')
        fieldLabelName.innerHTML = field.getFieldLabelName()
        collapsibleElement.append(fieldLabelName)

        const guifierContainerHeaderButtons = field.drawContainerHeaderButtons(true)

        collapsibleElement.append(guifierContainerHeaderButtons)

        return collapsibleElement
    }

    /**
     * This function is responsible for drawing the content of an array element that is Collapsible
     *
     * @returns {HTMLElement} html element object
     */
    private drawCollapsibleArrayElementContent (field: Field, lastElement = false): HTMLElement {
        const collapsibleElementContent = document.createElement('div')
        collapsibleElementContent.classList.add('guifierCollapsibleElementContent')
        if (!this.showSecondaryColors) {
            collapsibleElementContent.classList.add('guifierPrimaryBgColor')
        } else {
            collapsibleElementContent.classList.add('guifierSecondaryBgColor')
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
            collapsibleElementInnerContentContainer.classList.add('guifierCollapsibleElementInnerContentContainer')
            collapsibleElementInnerContentContainer.append(field.drawCollapsibleFieldContentWithoutContainer())
            collapsibleElementContent.append(collapsibleElementInnerContentContainer)
        } else {
            const arrayField = (field as unknown as ArrayContainer)
            arrayField.numberOfLevels = this.numberOfLevels + 1
            collapsibleElementContent.append(arrayField.draw())
        }

        // hide the collapsible elements
        collapsibleElementContent.classList.add('guifierNoneDisplay')

        return collapsibleElementContent
    }

    /**
     * This function is responsible for drawing levels line for the array
     *
     * @returns {HTMLElement} html element object
     */
    private drawArrayLevels (numberOfLevels: number): HTMLElement {
        const arrayLevelsContainer = document.createElement('div')
        arrayLevelsContainer.classList.add('guifierArrayLevelsContainer')
        if (numberOfLevels === 0) {
            numberOfLevels++
        }
        for (let index = 0; index < numberOfLevels; index++) {
            const guifierArrayLevelElement = document.createElement('div')
            guifierArrayLevelElement.classList.add('guifierArrayLevelElement')
            arrayLevelsContainer.append(guifierArrayLevelElement)
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
                            button.classList.toggle('guifierRotate')
                            bodyElement.classList.toggle('guifierNoneDisplay')
                        })
                        break
                    case 'delete':
                        button.addEventListener('click', (e: MouseEvent) => {
                            const deleteButton = e.target as HTMLElement
                            const elementContainer = deleteButton.parentElement?.parentElement?.parentElement?.parentElement
                            const elementIndex = elementContainer?.dataset.elementIndex as string
                            parentObjectContainer.removeElement(parseInt(elementIndex))
                        })
                        break
                    case 'add':
                        button.addEventListener('click', () => {
                            Promise.resolve().then(async () => {
                                if (childContainer.getFieldLabelName() === 'Object') {
                                    await (childContainer as ObjectContainer).letUserAddProperty()
                                } else if (childContainer.getFieldLabelName() === 'Array') {
                                    await (childContainer as ArrayContainer).letUserAddElement()
                                }
                            }).catch((error) => {
                                console.error(error)
                            })
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
    private removeElement (elementIndex: number): void {
        // removing the dom
        const guifierArrayFieldContainers = this.getArrayFieldContainers()
        if (guifierArrayFieldContainers[elementIndex].classList.contains('guifierContainerFieldType')) {
            guifierArrayFieldContainers[elementIndex].nextElementSibling?.remove()
        }
        const animationMilliSeconds = 150
        const height = guifierArrayFieldContainers[elementIndex].offsetHeight
        guifierArrayFieldContainers[elementIndex].style.height = `${height}px`
        guifierArrayFieldContainers[elementIndex].style.transition = `${animationMilliSeconds}ms`
        setTimeout(() => {
            guifierArrayFieldContainers[elementIndex].classList.add('guifierHeightZero')
            guifierArrayFieldContainers[elementIndex].classList.add('guifierOpacityZero')
        }, 0)
        setTimeout(() => {
            guifierArrayFieldContainers[elementIndex].remove()
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
                this.contentBody.append(this.drawEmptyContent(true))
            }
        }, animationMilliSeconds)

        if (this.params.onChange !== undefined) {
            this.params.onChange()
        }
    }

    /**
     * This function lets the user add an element by showing a prompt to him
     */
    public async letUserAddElement (): Promise<void> {
        const cards: CardSchemaInternal[] = []
        for (const key in fieldsMetaData) {
            const element = fieldsMetaData[key]
            if (element.staticObject.isBaseField) {
                cards.push({
                    icon: element.staticObject.fieldIcon,
                    text: element.staticObject.fieldLabelName,
                    value: element.staticObject.fieldName
                })
            }
        }
        const dialogData = {
            'Field Type': {
                _fieldType: 'cardSelect',
                _params: {
                    cards
                },
                _value: ''
            }
        }
        const dialogParams = {
            elementId: this.params.elementId,
            dialogTitle: 'New Field'
        }
        const data = await Dialog.get(dialogData, dialogParams)

        // adding the element
        if (data !== null) {
            const propertyExample: Property = {
                _path: [...this.property._path, this.containerLength],
                _key: this.containerLength,
                _valueType: PrimitiveTypes.String,
                _value: '',
                _fieldType: data['Field Type'],
                _rules: undefined,
                _params: undefined
            }
            this.addElement(propertyExample)
        }
    }

    /**
     * This function is responsible for adding a property in an object container
     */
    public addElement (property: Property): void {
        if (this.containerLength === 0) {
            this.contentBody.innerHTML = ''
        }
        const element = this.drawElement(property)
        this.contentBody.append(element)
        this.containerLength++

        if (this.params.onChange !== undefined) {
            this.params.onChange()
        }
    }

    /**
     * This function is responsible for redrawing Elements in an Array Container
     */
    private resetElementsUiInArrayContainer (): void {
        const guifierArrayFieldContainers = this.getArrayFieldContainers()
        guifierArrayFieldContainers.forEach((element, index) => {
            // resetting the index numbers of the elements in the array container
            const indexLabel = element.querySelector('.guifierArrayIndexLabel')
            if (indexLabel !== null) {
                indexLabel.innerHTML = `${index + 1}`
            }
            // resetting the background colors for the elements in the array container
            element.classList.remove('guifierOddBackground')
            if (isOdd(index)) {
                element.classList.add('guifierOddBackground')
            }
            // resetting the index element in the dataset of the array element container
            element.dataset.elementIndex = `${index}`
        })
    }

    /**
     * This function is responsible for getting all the ArrayFieldContainers
     */
    private getArrayFieldContainers (): HTMLElement[] {
        const guifierArrayFieldContainers = [] as HTMLElement[]
        for (let index = 0; index < this.contentBody.children.length; index++) {
            if (this.contentBody.children[index].classList.contains('guifierArrayFieldContainer')) {
                guifierArrayFieldContainers.push(this.contentBody.children[index] as HTMLElement)
            }
        }

        return guifierArrayFieldContainers
    }
}
