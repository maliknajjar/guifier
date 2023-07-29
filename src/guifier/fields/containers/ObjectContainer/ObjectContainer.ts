import './objectContainerStyle.css'

import type { Property } from '../../../types'
import type { ArrayContainer } from '../ArrayContainer/ArrayContainer'
import type { Field } from '../../Field/Field'
import type { CardSchemaInternal } from '../../CustomFields/CardSelectField/types'

import { Container } from '../Container/Container'
import { drawOutlineIcon, fieldsMetaData, getDefaultValueByFieldType, getFieldInstance, getType } from '../../../utils'

import lodash from 'lodash'
import { Dialog } from '../../../dialogue/dialog'

/**
 * Represents peroperty of type object
 */
export class ObjectContainer extends Container {
    /**
     * this is name of the field internaly
     */
    public static fieldName: string = 'object'

    public static fieldLabelName: string = 'Object'

    /**
     * this is the icon thats shown for users
     */
    public static fieldIcon: string = 'data_object'

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
        return ObjectContainer.fieldLabelName
    }

    /**
     * this function is responsible for drawing the HTMLElement object
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        const guifierObjectContainerbody = document.createElement('div')
        guifierObjectContainerbody.classList.add('guifierObjectContainerbody')

        if (this.containerInFirstLevel()) {
            guifierObjectContainerbody.style.overflowY = 'auto'
        }

        const object = this.property._value

        this.containerLength = Object.keys(object).length

        // checking if the array is empty
        if (!lodash.isEmpty(object)) {
            for (const key in object) {
                const property = object[key]
                const propertyElement = this.drawProperty(property)
                guifierObjectContainerbody.append(propertyElement)
            }
        } else {
            guifierObjectContainerbody.append(this.drawEmptyContent(false))
        }

        this.contentBody = guifierObjectContainerbody

        return guifierObjectContainerbody
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
            const guifierObjectFieldContainer = document.createElement('div')
            guifierObjectFieldContainer.classList.add('guifierObjectFieldContainer')

            // TODO: make local params have higher priority. they should always have higher priority
            // draw the field in full width if the user specified that in the _params
            if (field.localParam.fullWidth) {
                guifierObjectFieldContainer.style.gridColumn = 'span 2'
            } else {
                guifierObjectFieldContainer.style.gridColumn = 'span 1'
            }

            // draw the field in full width if the user specified that
            if (this.params.expandFieldsToFullWidth) {
                guifierObjectFieldContainer.style.gridColumn = 'span 2'
            }

            const labelContainer = document.createElement('div')
            labelContainer.classList.add('guifierObjectLabelContainer')

            const textPart = document.createElement('div')
            textPart.classList.add('guifierObjectLabelTextPart')
            const labelName = property._key
            textPart.innerHTML = labelName.toString()
            labelContainer.append(textPart)

            const buttonsPart = document.createElement('div')
            buttonsPart.classList.add('guifierObjectLabelButtonsPart')
            // TODO: add the delete button or any other crud buttons
            const fieldButtons = this.drawFieldButtons(field, guifierObjectFieldContainer)
            Container.showHeaderButtonsWhenHovering(fieldButtons, guifierObjectFieldContainer, true)
            buttonsPart.append(fieldButtons)
            // TODO: add the button that changes the the keyName of the field
            // const changeFieldKeyNameButton = this.drawChangeFieldKeyNameButton()
            labelContainer.append(buttonsPart)

            guifierObjectFieldContainer.append(labelContainer)

            field.showSecondaryColors = this.showSecondaryColors
            const fieldElement = field.draw()

            const fieldInnerContainer = document.createElement('div')
            fieldInnerContainer.classList.add('guifierObjectfieldInnerContainer')
            fieldInnerContainer.append(fieldElement)
            guifierObjectFieldContainer.append(fieldInnerContainer)

            propertyElement = guifierObjectFieldContainer
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
        if (this.params.readOnlyMode) {
            fieldButtons.style.display = 'none'
        }

        // TODO: hide the edit button for now.
        // but in the future this will be responsible editing the
        // field name, parameters and the rules of the field

        // const editButton = drawOutlineIcon('edit')
        // editButton.addEventListener('click', () => {
        //     Promise.resolve().then(async () => {
        //         await this.letUserEditProperty(field.keyName)
        //     }).catch((error) => {
        //         console.error(error)
        //     })
        // })
        // fieldButtons.append(minusButton)

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
    public static addingEventListenerForHeaderButtons (containerHeaderButtons: HTMLElement, parentObjectContainer: ObjectContainer, childContainer: ObjectContainer | ArrayContainer): void {
        if (containerHeaderButtons !== null) {
            const buttons = Array.from(containerHeaderButtons.children)
            buttons.forEach((button) => {
                switch (button.innerHTML) {
                    case 'expand_less':
                        button.addEventListener('click', () => {
                            const bodyElement = button.parentElement?.parentElement?.nextElementSibling as HTMLDivElement
                            const headerElement = button.parentElement?.parentElement as HTMLDivElement
                            headerElement.classList.toggle('guifierPrimaryBottomBorder')
                            button.classList.toggle('guifierRotate')
                            bodyElement.classList.toggle('guifierNoneDisplay')
                        })
                        break
                    case 'delete':
                        button.addEventListener('click', () => {
                            parentObjectContainer.deleteProperty(childContainer.keyName)
                            const element = (childContainer as ObjectContainer).contentBody
                            const container = element.closest('.guifierObjectFieldContainer')
                            container?.remove()
                        })
                        break
                    case 'add':
                        button.addEventListener('click', () => {
                            console.log('saklskalskalsk')
                            Promise.resolve().then(async () => {
                                if (childContainer.getFieldLabelName() === 'Object') {
                                    const container = (childContainer as ObjectContainer)
                                    await container.letUserAddProperty()
                                } else if (childContainer.getFieldLabelName() === 'Array') {
                                    const container = (childContainer as ArrayContainer)
                                    await container.letUserAddElement()
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
     * This function is responsible for deleting an object property in the ui
     */
    protected deleteProperty (propetyName: string | number): void {
        const path = lodash.cloneDeep(this.property._path)
        path.push(propetyName)
        const pathWithPropetyName = path
        this.data.removeData(pathWithPropetyName)

        // reducing the counter
        this.containerLength--
        if (this.containerLength === 0) {
            this.contentBody.append(this.drawEmptyContent(false))
        }

        if (this.params.onChange !== undefined) {
            this.params.onChange()
        }
    }

    /**
     * This function is responsible for adding a property in an object container
     */
    public addProperty (property: Property): void {
        property = lodash.cloneDeep(property)
        this.data.addProperty(property)

        if (this.containerLength === 0) {
            this.contentBody.innerHTML = ''
        }
        this.contentBody.append(this.drawProperty(property))
        this.containerLength++

        if (this.params.onChange !== undefined) {
            this.params.onChange()
        }
    }

    /**
     * This function lets the user add a property to an object container by showing a prompt to him
     */
    public async letUserAddProperty (): Promise<void> {
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
            'Field Name': '',
            'Field Type': {
                _fieldType: 'cardSelect',
                _params: {
                    cards
                },
                _value: ''
            }
        }
        const dialogParams = {
            elementSelector: this.params.elementSelector + ' > div',
            dialogTitle: 'New Field'
        }
        const data = await Dialog.get(dialogData, dialogParams)

        // adding the element
        if (data !== null) {
            const newProperty: Property = {
                _path: [...this.property._path, data['Field Name']],
                _key: data['Field Name'],
                _valueType: getType(getDefaultValueByFieldType(data['Field Type'])),
                _value: getDefaultValueByFieldType(data['Field Type']), // FIXME: this function here adds a huge object instead of just returning an empty object when creating two objects in the gui
                _fieldType: data['Field Type'],
                _rules: undefined,
                _params: undefined
            }
            this.addProperty(newProperty)
        }
    }
}
