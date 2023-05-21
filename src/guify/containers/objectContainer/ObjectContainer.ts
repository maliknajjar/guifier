// import type { Property } from '../../types'
import { Container } from '../Container'
import { getFieldInstance } from '../../utils'

import './style.css'

/**
 * Represents peroperty of type object
 */
export class ObjectContainer extends Container {
    // constructor (property: Property) {
    //     super(property)

    //     // TODO: validate the value

    //     // TODO: validate the params

    //     // TODO: validate the rules
    // }

    /**
     * this function is responsible for drawing the HTMLElement object
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // creating the container div element
        const objectContainer = document.createElement('div')
        objectContainer.classList.add('guifyObjectContainer')

        // giving specific edits for the object if it was in the first level
        if (this.containerInFirstLevel()) {
            objectContainer.classList.add('guifyFullHeight')
        }

        // drawing the fields or containers that resides inside this container
        const object = this.property._value
        for (const key in object) {
            const property = object[key]
            const field = getFieldInstance(property)
            const fieldElement = field.draw()
            objectContainer.append(fieldElement)
        }

        return objectContainer
    }
}
