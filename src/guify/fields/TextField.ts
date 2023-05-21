import { Field } from './Field'

export class TextField extends Field {
    public draw (): HTMLElement {
        const element = document.createElement('input')
        element.type = 'text'
        return element
    }
}
