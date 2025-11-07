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
        let inputElement: HTMLInputElement | HTMLTextAreaElement

        // Auto-detect multiline if the value contains line breaks
        const hasLineBreaks = typeof this.property._value === 'string' && this.property._value.includes('\n')

        if (hasLineBreaks) {
            // drawing the textarea for multiline text
            const textareaElement = document.createElement('textarea')
            textareaElement.classList.add('guifierTextField', 'guifierTextFieldMultiline')
            if (this.property._value !== '') {
                textareaElement.value = this.property._value
            }
            textareaElement.placeholder = 'Multiline Text Field'

            // auto-resize functionality for textarea
            const autoResize = (): void => {
                textareaElement.style.height = 'auto'
                textareaElement.style.height = `${Math.max(textareaElement.scrollHeight, 45)}px`
            }

            textareaElement.addEventListener('input', autoResize)
            // Set initial height
            setTimeout(autoResize, 0)

            inputElement = textareaElement
        } else {
            // drawing the input for single line text
            const singleLineElement = document.createElement('input')
            singleLineElement.type = 'text'
            singleLineElement.classList.add('guifierTextField')
            if (this.property._value !== '') {
                singleLineElement.value = this.property._value
            }
            singleLineElement.placeholder = 'Text Field'

            inputElement = singleLineElement
        }

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
        const element = event.target as HTMLInputElement | HTMLTextAreaElement
        this.setValue(element.value)
    }
}
