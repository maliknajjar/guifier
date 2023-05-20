import type { Data } from './Data'
import { ObjectContainer } from '../containers/objectContainer/ObjectContainer'
import { ArrayContainer } from '../containers/arrayContainer/ArrayContainer'

/**
 * Represents object that will handle generating html from the data
 */
export class View {
    public data: Data
    private generatedElement: HTMLElement = document.createElement('null')

    constructor (data: Data) {
        this.data = data

        // drawing the data
        this.drawData()
    }

    /**
     * This method returns the HTMLElement based on the data
     */
    private drawData (): void {
        console.log('starting drawing data')
        // for (const [property, path] of this.data.iterateOverProperties()) {
        //     console.log(path.join('.'))
        //     console.log(property)
        // }
        if (this.data.parsedData._valueType === 'object') {
            // if the root is an object
            const objectContainer = new ObjectContainer(this.data.parsedData)
            this.generatedElement = objectContainer.draw()
        } else {
            // if the root is an array
            const arrayContainer = new ArrayContainer(this.data.parsedData)
            this.generatedElement = arrayContainer.draw()
        }
    }
}
