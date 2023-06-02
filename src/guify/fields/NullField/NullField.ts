import './nullFieldStyle.css'

import { Field } from '../Field/Field'

export class NullField extends Field {
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
     * this function is responsible for drawing the text field HTMLElement
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // creating the container element
        const FieldContainer = document.createElement('div')

        // drawing the field label div
        FieldContainer.append(this.drawFieldLabel())

        // drawing the null field
        const nullElement = document.createElement('div')
        nullElement.classList.add('guifyNullField')
        const textElement = document.createElement('div')
        textElement.classList.add('guifyNullFieldText')
        textElement.innerHTML = 'Null'
        const iconElement = document.createElement('i')
        iconElement.classList.add('guifyNullFieldIcon')
        iconElement.classList.add('fa-solid')
        iconElement.classList.add('fa-ban')
        nullElement.append(textElement)
        nullElement.append(iconElement)

        // appending the null field to the container
        FieldContainer.append(nullElement)

        return FieldContainer
    }
}
