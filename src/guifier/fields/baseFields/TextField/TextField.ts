import './textFieldStyle.css'

import type { TextFieldLocalParamInternal } from './types'

import { Field } from '../../Field/Field'
import { textFieldLocalParamSchema } from './types'

export class TextField extends Field {
    /**
     * this is name of the field internaly
     */
    public static fieldName: string = 'text'

    /**
     * this is shown name to the user
     */
    public static fieldLabelName: string = 'Text'

    /**
     * this is the icon thats shown for users
     */
    public static fieldIcon: string = 'title'

    /**
     * The localParam property is the this.property._params of this field
     */
    public localParam: TextFieldLocalParamInternal = textFieldLocalParamSchema.parse(this.property._params)

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
        return TextField.fieldLabelName
    }

    /**
     * this function is responsible for drawing the text field HTMLElement
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // drawing the input
        const inputElement = document.createElement('input')
        inputElement.type = 'text'
        inputElement.classList.add('guifierTextField')
        if (this.property._value !== '') {
            inputElement.value = this.property._value
        }

        // adding a placeholder
        inputElement.placeholder = 'Text Field'

        // setting style based on color set wether primary or secondary
        if (this.showSecondaryColors) {
            inputElement.classList.add('guifierPrimaryBgColor')
        } else {
            inputElement.classList.add('guifierSecondaryBgColor')
        }

        // adding the event handler
        inputElement.addEventListener('input', (e) => {
            this.inputEventHandler(e)
        })

        return inputElement
    }

    /**
     * This function handles the input event on the text field
     */
    private inputEventHandler (event: Event): void {
        const element = event.target as HTMLInputElement
        this.setValue(element.value)
    }
}
