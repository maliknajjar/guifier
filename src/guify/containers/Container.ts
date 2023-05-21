import type { Property } from '../types'

export abstract class Container {
    protected property: Property

    constructor (property: Property) {
        this.property = property
    }

    public abstract draw (): void

    /**
     * this method checks if the current container is the
     * first container and its not a nested container
     *
     * @returns {HTMLElement} html element object
     */
    protected containerInFirstLevel (): boolean {
        return this.property._path.length === 1
    }
}
