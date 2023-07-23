import './numberFieldStyle.css'

import { Field } from '../../Field/Field'
import { drawOutlineIcon } from '../../../utils'

export class NumberField extends Field {
    /**
     * this is name of the field internaly
     */
    public static fieldName: string = 'number'

    public static fieldLabelName: string = 'Number'

    /**
     * this is the icon thats shown for users
     */
    public static fieldIcon: string = 'numbers'

    /**
     * this property is an interval handler used to simulate
     * keeping pressing on the plus or minus buttons
     */
    private intervalId: number = 0

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
        return NumberField.fieldLabelName
    }

    /**
     * this function is responsible for drawing the text field HTMLElement
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // drawing the input container
        const inputContainerElement = document.createElement('div')
        inputContainerElement.classList.add('guifierNumberInputContainer')

        // drawing the input
        const inputElement = document.createElement('input')
        inputElement.type = 'number'
        inputElement.classList.add('guifierNumberField')
        if (this.property._value !== '') {
            inputElement.value = this.property._value
        }

        // adding two buttons
        const buttonsContainerElement = document.createElement('div')
        buttonsContainerElement.classList.add('guifierButtonsContainer')

        const minusButtonElement = document.createElement('div')
        const minusIcon = drawOutlineIcon('remove')
        minusButtonElement.classList.add('guifierNumberButton')
        minusButtonElement.append(minusIcon)
        minusButtonElement.addEventListener('mousedown', () => {
            this.keyDownInputButtonsEventHandler(inputElement, false)
        })
        minusButtonElement.addEventListener('mouseup', () => {
            this.keyUpInputButtonsEventHandler()
        })

        const plusButtonElement = document.createElement('div')
        const plusIcon = drawOutlineIcon('add')
        plusButtonElement.classList.add('guifierNumberButton')
        plusButtonElement.append(plusIcon)
        plusButtonElement.addEventListener('mousedown', () => {
            this.keyDownInputButtonsEventHandler(inputElement, true)
        })
        plusButtonElement.addEventListener('mouseup', () => {
            this.keyUpInputButtonsEventHandler()
        })

        if (this.showSecondaryColors) {
            minusButtonElement.classList.add('guifierSecondaryBgColor')
            plusButtonElement.classList.add('guifierSecondaryBgColor')
        } else {
            minusButtonElement.classList.add('guifierPrimaryBgColor')
            plusButtonElement.classList.add('guifierPrimaryBgColor')
        }

        buttonsContainerElement.append(minusButtonElement)
        buttonsContainerElement.append(plusButtonElement)

        inputContainerElement.append(inputElement)
        inputContainerElement.append(buttonsContainerElement)

        // adding the event handler
        inputElement.addEventListener('input', () => {
            this.inputEventHandler(inputElement)
        })

        // setting style based on color set wether primary or secondary
        if (this.showSecondaryColors) {
            inputElement.classList.add('guifierPrimaryBgColor')
        } else {
            inputElement.classList.add('guifierSecondaryBgColor')
        }

        return inputContainerElement
    }

    /**
     * This function handles the input event on the text field
     */
    private inputEventHandler (element: HTMLInputElement): void {
        this.setValue(element.value)
    }

    /**
     * This function handles the click event on the minus and plus buttons
     */
    private keyDownInputButtonsEventHandler (input: HTMLInputElement, isPlus: boolean): void {
        clearInterval(this.intervalId)
        if (input.value === '') {
            input.value = '0'
        }
        if (isPlus) {
            input.value = (parseInt(input.value) + 1).toString()
            this.intervalId = setInterval(() => {
                input.value = (parseInt(input.value) + 1).toString()
            }, 100)
        } else {
            input.value = (parseInt(input.value) - 1).toString()
            this.intervalId = setInterval(() => {
                input.value = (parseInt(input.value) - 1).toString()
            }, 100)
        }
        this.setValue(parseInt(input.value))
    }

    /**
     * This function handles the key up even that will stop the interval from running
     */
    private keyUpInputButtonsEventHandler (): void {
        clearInterval(this.intervalId)
    }
}
