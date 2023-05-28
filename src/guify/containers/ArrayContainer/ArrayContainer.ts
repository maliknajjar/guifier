import type { Property } from '../../types'

/**
 * Represents peroperty of type array
 */
export class ArrayContainer {
    readonly property: Property

    constructor (property: Property) {
        this.property = property

        // TODO: validate the value

        // TODO: validate the params

        // TODO: validate the rules
    }

    /**
     * this function is responsible for drawing the HTMLElement object
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        console.log('drawing the object now')
        const el = document.createElement('div')
        el.append('the object')
        return el
    }
}
