import './Container.css'

import { Field } from '../../../fields/Field/Field'

export abstract class Container extends Field {
    /**
     * this property tells if the current field is a big field like object, array or a rich text field
     */
    public isCollapsible = true

    /**
     * this method checks if the current container is the
     * first container and its not a nested container
     *
     * @returns {HTMLElement} html element object
     */
    protected containerInFirstLevel (): boolean {
        return this.property._path.length === 1
    }

    /**
     * This function is responsible for drawing the container for a container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawContainer (): HTMLElement {
        const objectName = this.property._key
        const guifyObjectContainerHeader = document.createElement('div')
        guifyObjectContainerHeader.classList.add('guifyContainerHeader')
        guifyObjectContainerHeader.innerHTML = objectName

        return guifyObjectContainerHeader
    }

    /**
     * This function is responsible for drawing the header for a container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawHeader (): HTMLElement {
        const objectName = this.property._key
        const guifyObjectContainerHeader = document.createElement('div')
        guifyObjectContainerHeader.classList.add('guifyContainerHeader')
        guifyObjectContainerHeader.innerHTML = objectName

        return guifyObjectContainerHeader
    }
}
