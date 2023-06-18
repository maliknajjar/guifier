import type { Data } from './Data'

import { getFieldInstance } from '../utils'

/**
 * Represents object that will handle generating html from the data
 */
export class View {
    public data: Data
    private generatedHTML: HTMLElement = document.createElement('null')

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
        const container = getFieldInstance(this.data.parsedData, this.data)
        this.generatedHTML = container.draw()
    }

    /**
     * This method returns the generated HTMLElement
     */
    public getGeneratedHTML (): HTMLElement {
        return this.generatedHTML
    }
}
