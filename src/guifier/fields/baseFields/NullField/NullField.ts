import './nullFieldStyle.css'

import { Field } from '../../Field/Field'
import { drawOutlineIcon } from '../../../utils'

export class NullField extends Field {
    /**
     * this is name of the field internaly
     */
    public static fieldName: string = 'null'

    public static fieldLabelName: string = 'Null'

    /**
     * this is the icon thats shown for users
     */
    public static fieldIcon: string = 'block'

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
        return NullField.fieldLabelName
    }

    /**
     * this function is responsible for drawing the text field HTMLElement
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // drawing the null field
        const nullElement = document.createElement('div')
        nullElement.classList.add('guifierNullField')

        const textElement = document.createElement('div')
        textElement.classList.add('guifierNullFieldText')
        textElement.innerHTML = 'Null'
        nullElement.append(textElement)

        const iconElement = drawOutlineIcon('block')
        nullElement.append(iconElement)

        return nullElement
    }
}
