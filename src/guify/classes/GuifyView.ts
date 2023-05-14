import type { GuifyData } from './GuifyData'

/**
 * Represents object that will handle generating html from the data
 */
export class GuifyView {
    public data: GuifyData

    constructor (data: GuifyData) {
        this.data = data

        // drawing the data
        this.drawDataRecursively()
    }

    private drawDataRecursively (): any {
        console.log('starting drawing data')
        for (const [obj, path] of this.data.iterateOverProperties()) {
            
        }
    }
}
