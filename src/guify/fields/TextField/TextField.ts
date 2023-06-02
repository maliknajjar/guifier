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
        if (this.property._value !== '') {
            inputElement.value = this.property._value
        }

        // setting style based on color set wether primary or secondary
        if (this.showSecondaryColors) {
            inputElement.classList.add('guifyPrimaryBgColor')
        } else {
            inputElement.classList.add('guifySecondaryBgColor')
        }

        // adding the event handler
        inputElement.addEventListener('input', (e) => {
            this.inputEventHandler(e)
        })

        FieldContainer.append(inputElement)

        return FieldContainer
    }

    /**
     * This function handles the input event on the text field
     */
    private inputEventHandler (event: Event): void {
        const element = event.target as HTMLInputElement
        this.setValue(element.value)
    }
}
