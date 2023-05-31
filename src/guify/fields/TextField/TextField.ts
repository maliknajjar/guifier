import './textFieldStyle.css'

import { Field } from '../Field/Field'

export class TextField extends Field {
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

        // drawing the input
        const inputElement = document.createElement('input')
        inputElement.type = 'text'
        inputElement.classList.add('guifyTextField')

        // setting style based on color set wether primary or secondary
        if (this.showSecondaryColors) {
            inputElement.classList.add('guifyPrimaryBgColor')
        } else {
            inputElement.classList.add('guifySecondaryBgColor')
        }

        FieldContainer.append(inputElement)

        return FieldContainer
    }
}
