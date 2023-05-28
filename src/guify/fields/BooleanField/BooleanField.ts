import { Field } from '../Field/Field'

export class BooleanField extends Field {
    public draw (): HTMLElement {
        const FieldContainer = document.createElement('div')
        const inputElement = document.createElement('input')
        inputElement.type = 'checkbox'

        FieldContainer.append(inputElement)
        return FieldContainer
    }
}
