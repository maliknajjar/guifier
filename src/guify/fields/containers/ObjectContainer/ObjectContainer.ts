import './objectContainerStyle.css'

import type { Property } from '../../../types'
import type { Data } from '../../../classes/Data'
import type { ArrayContainer } from '../ArrayContainer/ArrayContainer'

import { Container } from '../Container/Container'
import { drawOutlineIcon, getFieldInstance } from '../../../utils'

import cloneDeep from 'lodash/cloneDeep'

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
        for (const key in object) {
            const property = object[key]
            const field = getFieldInstance(property, this.data)
            let propertyElement
            if (field.isCollapsible) {
                field.showSecondaryColors = !this.showSecondaryColors
                const container = (field as Container).drawContentWithContainer(field)
                const containerHeaderButtons = container.children[0].children[1] as HTMLElement
                ObjectContainer.addingEventListenerForHeaderButtons(containerHeaderButtons, this, field as ObjectContainer | ArrayContainer)
                // TODO: add event listener for the header buttons from an object Container function here
                propertyElement = container
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

                // TODO: add the delete button or any other crud buttons
                const fieldButtons = this.drawFieldButtons()
                Container.showHeaderButtonsWhenHovering(fieldButtons, guifyObjectFieldContainer)
                guifyObjectFieldContainer.append(fieldButtons)

                // TODO: add the button that changes the the keyName of the field
                // const changeFieldKeyNameButton = this.drawChangeFieldKeyNameButton()

                propertyElement = guifyObjectFieldContainer
            }

            guifyObjectContainerbody.append(propertyElement)
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
    public drawFieldButtons (): HTMLElement {
        // creating the container
        const fieldButtons = document.createElement('div')
        fieldButtons.classList.add('fieldButtons')

        // creating the buttons
        const deleteButton = drawOutlineIcon('delete')
        fieldButtons.append(deleteButton)

        const addButton = drawOutlineIcon('add')
        fieldButtons.append(addButton)

        const minusButton = drawOutlineIcon('edit')
        fieldButtons.append(minusButton)

        return fieldButtons
    }

    /**
     * This function is responsible adding event listeners to the header buttons of an object container
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
