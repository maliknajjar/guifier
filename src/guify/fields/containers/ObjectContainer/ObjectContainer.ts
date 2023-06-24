import './objectContainerStyle.css'

import type { Property } from '../../../types'
import type { Data } from '../../../classes/Data'

import { Container } from '../Container/Container'
import { getFieldInstance } from '../../../utils'

/**
 * Represents peroperty of type object
 */
export class ObjectContainer extends Container {
    public FieldLabelName: string = 'Object'
    private objectBody: HTMLElement = document.createElement('div')

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
                if (field.FieldLabelName === 'Object') {
                    ObjectContainer.addingEventListenerForObjectHeaderButtons(container, this, field as ObjectContainer)
                }
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
                propertyElement = guifyObjectFieldContainer
            }

            guifyObjectContainerbody.append(propertyElement)
        }

        this.objectBody = guifyObjectContainerbody

        return guifyObjectContainerbody
    }

    // TODO: add docs
    public drawCollapsibleFieldContentWithoutContainer (): HTMLElement {
        const el = this.draw()
        el.style.padding = '0'
        return el
    }

    /**
     * This function is responsible adding event listeners to the header buttons of an object container
     */
    protected static addingEventListenerForObjectHeaderButtons (container: HTMLElement, parentObjectContainer: ObjectContainer, childObjectContainer: ObjectContainer): void {
        const containerHeaderButtons = container.querySelector('.guifyContainerHeaderButtons')
        if (containerHeaderButtons !== null) {
            const buttons = Array.from(containerHeaderButtons.children)
            buttons.forEach((button) => {
                switch (button.innerHTML) {
                    case 'expand_less':
                        break
                    case 'delete':
                        button.addEventListener('click', () => {
                            console.log('delete an object')
                            console.log(childObjectContainer.keyName)
                            console.log(parentObjectContainer.keyName)
                            parentObjectContainer.deleteProperty(childObjectContainer.keyName)
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
    protected deleteProperty (propetyName): void {
        console.log(propetyName)
    }
}
