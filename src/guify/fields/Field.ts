import type { Property } from '../types'

export abstract class Field {
    protected property: Property

    constructor (property: Property) {
        this.property = property
    }

    public abstract draw (): HTMLElement
}
