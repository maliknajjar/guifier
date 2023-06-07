import './numberFieldStyle.css'

import { Field } from '../Field/Field'

export class NumberField extends Field {
    public FieldLabelName: string = 'Number'

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
     * this function is responsible for drawing the text field HTMLElement
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // drawing the input container
        const inputContainerElement = document.createElement('div')
        inputContainerElement.classList.add('guifyNumberInputContainer')

        // drawing the input
        const inputElement = document.createElement('input')
        inputElement.type = 'number'
        inputElement.classList.add('guifyNumberField')
        if (this.property._value !== '') {
            inputElement.value = this.property._value
        }

        // adding two buttons
        const buttonsContainerElement = document.createElement('div')
        buttonsContainerElement.classList.add('guifyButtonsContainer')

        const minusButtonElement = document.createElement('div')
        const minusIcon = document.createElement('i')
        minusIcon.classList.add('fa-solid')
        minusIcon.classList.add('fa-minus')
        minusButtonElement.classList.add('guifyNumberButton')
        minusButtonElement.append(minusIcon)
        minusButtonElement.addEventListener('mousedown', () => {
            this.keyDownInputButtonsEventHandler(inputElement, false)
        })
        minusButtonElement.addEventListener('mouseup', () => {
            this.keyUpInputButtonsEventHandler()
        })

        const plusButtonElement = document.createElement('div')
        const plusIcon = document.createElement('i')
        plusIcon.classList.add('fa-solid')
        plusIcon.classList.add('fa-plus')
        plusButtonElement.classList.add('guifyNumberButton')
        plusButtonElement.append(plusIcon)
        plusButtonElement.addEventListener('mousedown', () => {
            this.keyDownInputButtonsEventHandler(inputElement, true)
        })
        plusButtonElement.addEventListener('mouseup', () => {
            this.keyUpInputButtonsEventHandler()
        })

        if (this.showSecondaryColors) {
            minusButtonElement.classList.add('guifySecondaryBgColor')
            plusButtonElement.classList.add('guifySecondaryBgColor')
        } else {
            minusButtonElement.classList.add('guifyPrimaryBgColor')
            plusButtonElement.classList.add('guifyPrimaryBgColor')
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
            inputElement.classList.add('guifyPrimaryBgColor')
        } else {
            inputElement.classList.add('guifySecondaryBgColor')
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
