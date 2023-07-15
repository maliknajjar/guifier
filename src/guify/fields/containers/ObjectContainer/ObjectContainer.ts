import './objectContainerStyle.css'

import type { Parameters, Property } from '../../../types'
import type { Data } from '../../../classes/Data'
import type { ArrayContainer } from '../ArrayContainer/ArrayContainer'
import type { Field } from '../../Field/Field'

import { Container } from '../Container/Container'
import { drawOutlineIcon, getFieldInstance } from '../../../utils'

import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import { PrimitiveTypes } from '../../../enums'
import { Dialog } from '../../../dialogue/dialog'

/**
 * Represents peroperty of type object
 */
export class ObjectContainer extends Container {
    public static FieldLabelName: string = 'Object'

    constructor (property: Property, data: Data, params: Parameters) {
        super(property, data, params)
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
     * This function validates the _rules of the property object
     */
    public getFieldLabelName (): string {
        return ObjectContainer.FieldLabelName
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

        this.containerLength = Object.keys(object).length

        // checking if the array is empty
        if (!isEmpty(object)) {
            for (const key in object) {
                const property = object[key]
                const propertyElement = this.drawProperty(property)
                guifyObjectContainerbody.append(propertyElement)
            }
        } else {
            guifyObjectContainerbody.append(this.drawEmptyContent())
        }

        this.contentBody = guifyObjectContainerbody

        return guifyObjectContainerbody
    }

    /**
     * This function is responsible for drawing a property of the object
     */
    protected drawProperty (property: Property): HTMLElement {
        const field = getFieldInstance(property, this.data, this.params)
        let propertyElement
        if (field.isCollapsible) {
            field.showSecondaryColors = !this.showSecondaryColors
            const container = (field as Container).drawContentWithContainer()
            const containerHeaderButtons = container.children[0].children[1] as HTMLElement
            ObjectContainer.addingEventListenerForHeaderButtons(containerHeaderButtons, this, field as ObjectContainer | ArrayContainer)
            propertyElement = container
        } else {
            const guifyObjectFieldContainer = document.createElement('div')
            guifyObjectFieldContainer.classList.add('guifyObjectFieldContainer')

            // draw the field in full width if the user specified that in the _params
            if (field.localParam.fullWidth) {
                guifyObjectFieldContainer.style.gridColumn = 'span 2'
            } else {
                guifyObjectFieldContainer.style.gridColumn = 'span 1'
            }

            // draw the field in full width if the user specified that
            if (this.params.expandFieldsToFullWidth) {
                guifyObjectFieldContainer.style.gridColumn = 'span 2'
            }

            const labelContainer = document.createElement('div')
            labelContainer.classList.add('guifyObjectLabelContainer')

            const textPart = document.createElement('div')
            textPart.classList.add('guifyObjectLabelTextPart')
            const labelName = property._key
            textPart.innerHTML = labelName.toString()
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

        return propertyElement
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
                            Promise.resolve().then(async () => {
                                if (childContainer.getFieldLabelName() === 'Object') {
                                    const container = (childContainer as ObjectContainer)
                                    const propertyExample: Property = {
                                        _path: [...container.property._path, container.containerLength],
                                        _key: container.containerLength,
                                        _valueType: PrimitiveTypes.String,
                                        _value: [],
                                        _fieldType: 'array',
                                        _rules: undefined,
                                        _params: undefined
                                    }
                                    container.addProperty(propertyExample)
                                } else if (childContainer.getFieldLabelName() === 'Array') {
                                    const container = (childContainer as ArrayContainer)

                                    // getting the data from the user
                                    // TODO: create a new field type contains cards a user can select
                                    // TODO: add two dialogs to simulate two pages and add the ability to change buttons names
                                    // TODO: create a static method here that returns the data for the creation insteaf of adding everything here
                                    const dialogData = {
                                        'Field Value': '',
                                        'Field Type': 'text'
                                    }
                                    const dialogParams = {
                                        elementId: parentObjectContainer.params.elementId,
                                        dialogTitle: 'new field Man'
                                    }
                                    const data = await Dialog.get(dialogData, dialogParams)

                                    const propertyExample: Property = {
                                        _path: [...container.property._path, container.containerLength],
                                        _key: container.containerLength,
                                        _valueType: PrimitiveTypes.String,
                                        _value: data['Field Value'],
                                        _fieldType: data['Field Type'],
                                        _rules: undefined,
                                        _params: undefined
                                    }
                                    container.addElement(propertyExample)
                                }
                            }).catch((error) => {
                                console.error(error)
                            })
                            // return Promise.resolve();
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

        // reducing the counter
        this.containerLength--
        if (this.containerLength === 0) {
            this.contentBody.append(this.drawEmptyContent())
        }
    }

    /**
     * This function is responsible for adding a property in an object container
     */
    public addProperty (property: Property): void {
        if (this.containerLength === 0) {
            this.contentBody.innerHTML = ''
        }
        this.contentBody.append(this.drawProperty(property))
        this.containerLength++
    }
}
