import type { Property } from '../../types'
import { Container } from '../Container'

import './style.css'

/**
 * Represents peroperty of type object
 */
export class ObjectContainer extends Container {
    readonly property: Property

    constructor (property: Property) {
        super(property)

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
        const objectContainer = document.createElement('div')
        objectContainer.classList.add('guifyObjectContainer')
        if (this.containerInFirstLevel()) {
            objectContainer.classList.add('guifyFullHeight')
        }
        objectContainer.append('the object')
        return objectContainer
    }
}
