import './booleanFieldStyle.css'

import { Field } from '../Field/Field'
import { booleanEventHandler } from './booleanFieldEventHandlers'

export class BooleanField extends Field {
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
     * this function is responsible for drawing the Boolean field HTMLElement
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // creating the container element
        const FieldContainer = document.createElement('div')

        // drawing the field label div
        FieldContainer.append(this.drawFieldLabel())

        // drawing the boolean div
        const booleanElement = document.createElement('div')
        booleanElement.classList.add('guifyBooleanField')

        // creating the true boolean part
        const TrueElement = document.createElement('div')
        TrueElement.classList.add('guifyBooleanElement')
        TrueElement.classList.add('guifyBooleanTrueElement')
        if (this.property._value === true) {
            TrueElement.classList.add('guifyBooleanTrueElementSelect')
        }
        TrueElement.innerHTML = 'True'
        booleanElement.append(TrueElement)

        // creating the false boolean part
        const FalseElement = document.createElement('div')
        FalseElement.classList.add('guifyBooleanElement')
        FalseElement.classList.add('guifyBooleanFalseElement')
        if (this.property._value === false) {
            FalseElement.classList.add('guifyBooleanFalseElementSelect')
        }
        FalseElement.innerHTML = 'False'
        booleanElement.append(FalseElement)

        // adding event handler for the boolean element
        booleanElement.addEventListener('click', (e) => { booleanEventHandler(e, TrueElement, FalseElement) })

        // appending boolean content to the field container
        FieldContainer.append(booleanElement)

        return FieldContainer
    }
}
