import { Field } from '../../Field/Field'

export class DateField extends Field {
    /**
     * this is name of the field internaly
     */
    public static fieldName: string = 'date'

    public static fieldLabelName: string = 'Date'

    /**
     * this is the icon thats shown for users
     */
    public static fieldIcon: string = 'calendar_month'

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
        return DateField.fieldLabelName
    }

    /**
     * this function is responsible for drawing the Boolean field HTMLElement
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // drawing the input
        const inputElement = document.createElement('input')
        inputElement.type = 'date'
        inputElement.classList.add('guifierTextField')
        const formattedDate = this.property._value.toISOString().split('T')[0]
        inputElement.value = formattedDate

        // adding a placeholder
        inputElement.placeholder = 'Text Field'

        // setting style based on color set wether primary or secondary
        if (this.showSecondaryColors) {
            inputElement.classList.add('guifierPrimaryBgColor')
        } else {
            inputElement.classList.add('guifierSecondaryBgColor')
        }

        // adding the event handler
        inputElement.addEventListener('input', (e) => {
            this.inputEventHandler(e)
        })

        return inputElement
    }

    /**
     * This function handles the input event on the text field
     */
    private inputEventHandler (event: Event): void {
        const element = event.target as HTMLInputElement
        this.setValue(new Date(element.value))
    }
}
