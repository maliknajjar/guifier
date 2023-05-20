import type { Property } from '../types'

export abstract class Container {
    readonly property: Property

    constructor (property: Property) {
        this.property = property
    }

    public abstract draw (): void

    protected containerInFirstLevel (): boolean {
        return this.property._path.length === 1
    }
}
