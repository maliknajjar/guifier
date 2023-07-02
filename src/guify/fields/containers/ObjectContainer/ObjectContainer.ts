import './objectContainerStyle.css'

import type { Property } from '../../../types'
import type { Data } from '../../../classes/Data'
import type { ArrayContainer } from '../ArrayContainer/ArrayContainer'
import type { Field } from '../../Field/Field'

import { Container } from '../Container/Container'
import { drawOutlineIcon, getFieldInstance } from '../../../utils'

import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'

/**
 * Represents peroperty of type object
 */
export class ObjectContainer extends Container {
    public FieldLabelName: string = 'Object'

    constructor (property: Property, data: Data) {
        super(property, data)
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
        const guifyObjectContainerbody = document.createElement('div')
        guifyObjectContainerbody.classList.add('guifyObjectContainerbody')

        if (this.containerInFirstLevel()) {
            guifyObjectContainerbody.style.overflowY = 'auto'
        }

        const object = this.property._value

        // checking if the array is empty
        if (!isEmpty(object)) {
            for (const key in object) {
                const property = object[key]
                const field = getFieldInstance(property, this.data)
                let propertyElement
                if (field.isCollapsible) {
                    field.showSecondaryColors = !this.showSecondaryColors
                    const container = (field as Container).drawContentWithContainer(field)
                    const containerHeaderButtons = container.children[0].children[1] as HTMLElement
                    ObjectContainer.addingEventListenerForHeaderButtons(containerHeaderButtons, this, field as ObjectContainer | ArrayContainer)
                    propertyElement = container
                } else {
                    const guifyObjectFieldContainer = document.createElement('div')
                    guifyObjectFieldContainer.classList.add('guifyObjectFieldContainer')

                    const labelContainer = document.createElement('div')
                    labelContainer.classList.add('guifyObjectLabelContainer')

                    const textPart = document.createElement('div')
                    textPart.classList.add('guifyObjectLabelTextPart')
                    const labelName = property._key
                    textPart.innerHTML = labelName
                    labelContainer.append(textPart)

                    const buttonsPart = document.createElement('div')
                    buttonsPart.classList.add('guifyObjectLabelButtonsPart')
                    // TODO: add the delete button or any other crud buttons
                    const fieldButtons = this.drawFieldButtons(field, guifyObjectFieldContainer)
                    Container.showHeaderButtonsWhenHovering(fieldButtons, guifyObjectFieldContainer, true)
                    buttonsPart.append(fieldButtons)
                    // TODO: add the button that changes the the keyName of the field
                    // const changeFieldKeyNameButton = this.drawChangeFieldKeyNameButton()
                    labelContainer.append(buttonsPart)

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
        } else {
            return 'this object is empty'
        }

        this.contentBody = guifyObjectContainerbody

        return guifyObjectContainerbody
    }

    /**
     * This function is responsible for drawing the object without a container. used for objects in arrays
     */
    public drawCollapsibleFieldContentWithoutContainer (): HTMLElement {
        const el = this.draw()
        el.style.padding = '0'
        return el
    }

    /**
     * This function is responsible for drawing buttons that edits a field in an object container
     */
    public drawFieldButtons (field: Field, fieldElement: HTMLElement): HTMLElement {
        // creating the container
        const fieldButtons = document.createElement('div')
        fieldButtons.classList.add('fieldButtons')

        // creating the buttons
        const minusButton = drawOutlineIcon('edit')
        fieldButtons.append(minusButton)

        const deleteButton = drawOutlineIcon('delete')
        deleteButton.addEventListener('click', () => {
            this.deleteProperty(field.keyName)
            fieldElement.remove()
        })
        fieldButtons.append(deleteButton)

        return fieldButtons
    }

    /**
     * This function is responsible of adding event listeners to the header buttons of an object container
     */
    protected static addingEventListenerForHeaderButtons (containerHeaderButtons: HTMLElement, parentObjectContainer: ObjectContainer, childContainer: ObjectContainer | ArrayContainer): void {
        if (containerHeaderButtons !== null) {
            const buttons = Array.from(containerHeaderButtons.children)
            buttons.forEach((button) => {
                switch (button.innerHTML) {
                    case 'expand_less':
                        button.addEventListener('click', () => {
                            const bodyElement = button.parentElement?.parentElement?.nextElementSibling as HTMLDivElement
                            const headerElement = button.parentElement?.parentElement as HTMLDivElement
                            headerElement.classList.toggle('guifyPrimaryBottomBorder')
                            button.classList.toggle('guifyRotate')
                            bodyElement.classList.toggle('guifyNoneDisplay')
                        })
                        break
                    case 'delete':
                        button.addEventListener('click', () => {
                            parentObjectContainer.deleteProperty(childContainer.keyName)
                            const element = (childContainer as ObjectContainer).contentBody
                            const container = element.closest('.guifyObjectFieldContainer')
                            container?.remove()
                        })
                        break
                    case 'add':
                        button.addEventListener('click', () => {
                            console.log('wowowow')
                        })
                        break
                    default:
                        break
                }
            })
        }
    }

    /**
     * This function is responsible for deleting an object property in the ui
     */
    protected deleteProperty (propetyName: string | number): void {
        const path = cloneDeep(this.property._path)
        path.push(propetyName)
        const pathWithPropetyName = path
        this.data.removeProperty(pathWithPropetyName)
    }
}
