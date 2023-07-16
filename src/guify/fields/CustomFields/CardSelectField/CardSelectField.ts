import './style.css'

import { Field } from '../../Field/Field'

export class CardSelectField extends Field {
    public static FieldLabelName: string = 'Card Select'

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
        return CardSelectField.FieldLabelName
    }

    /**
     * this function is responsible for drawing the text field HTMLElement
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // drawing the input
        const mainELement = document.createElement('div')
        mainELement.innerHTML = 'this is the new element'

        return mainELement
    }
}
