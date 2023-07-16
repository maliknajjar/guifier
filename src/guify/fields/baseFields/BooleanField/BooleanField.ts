import './booleanFieldStyle.css'

import { Field } from '../../Field/Field'

export class BooleanField extends Field {
    /**
     * this is name of the field internaly
     */
    public static fieldName: string = 'boolean'

    public static fieldLabelName: string = 'Boolean'

    /**
     * this is the icon thats shown for users
     */
    public static fieldIcon: string = 'check_box'

    /**
     * This function validates the _params of the property object
     */
    protected validateParams (): void {

    }

    /**
     * This function validates the _rules of the property object
     */
    protected validateRules (): void {

    }

    /**
     * This function validates the _rules of the property object
     */
    public getFieldLabelName (): string {
        return BooleanField.fieldLabelName
    }

    /**
     * this function is responsible for drawing the Boolean field HTMLElement
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // drawing the boolean div
        const booleanElement = document.createElement('div')
        booleanElement.classList.add('guifyBooleanField')

        // creating the true boolean part
        const TrueElement = document.createElement('div')
        TrueElement.classList.add('guifyBooleanElement')
        TrueElement.classList.add('guifyBooleanTrueElement')
        TrueElement.innerHTML = 'True'
        booleanElement.append(TrueElement)

        // creating the false boolean part
        const FalseElement = document.createElement('div')
        FalseElement.classList.add('guifyBooleanElement')
        FalseElement.classList.add('guifyBooleanFalseElement')
        FalseElement.innerHTML = 'False'
        booleanElement.append(FalseElement)

        // setting the value of the boolean in the html based on the data
        if (this.property._value === true) {
            TrueElement.classList.add('guifyBooleanTrueElementSelect')
        } else {
            FalseElement.classList.add('guifyBooleanFalseElementSelect')
        }

        // setting style based on color set wether primary or secondary
        if (this.showSecondaryColors) {
            booleanElement.classList.add('guifyPrimaryBgColor')
        } else {
            booleanElement.classList.add('guifySecondaryBgColor')
        }

        // adding event handler for the boolean element
        booleanElement.addEventListener('click', (e) => { this.booleanEventHandler(e, TrueElement, FalseElement) })

        return booleanElement
    }

    /**
     * this function is responsible handling the event when you click on the boolean field
     */
    private booleanEventHandler (e: MouseEvent, trueElement: HTMLElement, falseElement: HTMLElement): void {
        const targetElement = e.target as HTMLElement
        if (targetElement.classList.contains('guifyBooleanTrueElement')) {
            trueElement.classList.add('guifyBooleanTrueElementSelect')
            falseElement.classList.remove('guifyBooleanFalseElementSelect')
            // set the property value to true
            this.setValue(true)
        } else if (targetElement.classList.contains('guifyBooleanFalseElement')) {
            falseElement.classList.add('guifyBooleanFalseElementSelect')
            trueElement.classList.remove('guifyBooleanTrueElementSelect')
            // set the property value to true
            this.setValue(false)
        }
    }
}
