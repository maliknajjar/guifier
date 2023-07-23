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
        booleanElement.classList.add('guifierBooleanField')

        // creating the true boolean part
        const TrueElement = document.createElement('div')
        TrueElement.classList.add('guifierBooleanElement')
        TrueElement.classList.add('guifierBooleanTrueElement')
        TrueElement.innerHTML = 'True'
        booleanElement.append(TrueElement)

        // creating the false boolean part
        const FalseElement = document.createElement('div')
        FalseElement.classList.add('guifierBooleanElement')
        FalseElement.classList.add('guifierBooleanFalseElement')
        FalseElement.innerHTML = 'False'
        booleanElement.append(FalseElement)

        // setting the value of the boolean in the html based on the data
        if (this.property._value === true) {
            TrueElement.classList.add('guifierBooleanTrueElementSelect')
        } else {
            FalseElement.classList.add('guifierBooleanFalseElementSelect')
        }

        // setting style based on color set wether primary or secondary
        if (this.showSecondaryColors) {
            booleanElement.classList.add('guifierPrimaryBgColor')
        } else {
            booleanElement.classList.add('guifierSecondaryBgColor')
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
        if (targetElement.classList.contains('guifierBooleanTrueElement')) {
            trueElement.classList.add('guifierBooleanTrueElementSelect')
            falseElement.classList.remove('guifierBooleanFalseElementSelect')
            // set the property value to true
            this.setValue(true)
        } else if (targetElement.classList.contains('guifierBooleanFalseElement')) {
            falseElement.classList.add('guifierBooleanFalseElementSelect')
            trueElement.classList.remove('guifierBooleanTrueElementSelect')
            // set the property value to true
            this.setValue(false)
        }
    }
}
