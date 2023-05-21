import { Field } from './Field'

export class BooleanField extends Field {
    public draw (): HTMLElement {
        const element = document.createElement('input')
        element.type = 'checkbox'
        return element
    }
}
