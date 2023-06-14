import './nullFieldStyle.css'

import { Field } from '../../Field/Field'
import { drawOutlineIcon } from '../../../utils'

export class NullField extends Field {
    public FieldLabelName: string = 'Null'

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
        // drawing the null field
        const nullElement = document.createElement('div')
        nullElement.classList.add('guifyNullField')

        const textElement = document.createElement('div')
        textElement.classList.add('guifyNullFieldText')
        textElement.innerHTML = 'Null'
        nullElement.append(textElement)

        const iconElement = drawOutlineIcon('block')
        nullElement.append(iconElement)

        return nullElement
    }
}
