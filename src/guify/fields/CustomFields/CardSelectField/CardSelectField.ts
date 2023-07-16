import './style.css'

import { localParamSchema, type LocalParamInternal, type CardSchemaInternal } from './types'

import { Field } from '../../Field/Field'

export class CardSelectField extends Field {
    /**
     * this is name of the field internaly
     */
    public static fieldName: string = 'cardSelect'

    /**
     * this is the label name thats shown for users
     */
    public static fieldLabelName: string = 'Card Select'

    /**
     * this the flag that determens if the field is Base or a CustomField
     */
    public static isBaseField = false

    /**
     * The localParam property is the this.property._params of this field
     */
    public localParam: LocalParamInternal = localParamSchema.parse(this.property._params)

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
        return CardSelectField.fieldLabelName
    }

    /**
     * this function is responsible for drawing the text field HTMLElement
     *
     * @returns {HTMLElement} html element object
     */
    public draw (): HTMLElement {
        // drawing the card's container
        const mainElement = document.createElement('div')
        mainElement.classList.add('guifyCardsContainer')

        // drawing cards
        for (let index = 0; index < this.localParam.cards.length; index++) {
            const card = this.localParam.cards[index]
            const cardElement = document.createElement('div')
            cardElement.classList.add('guifyCard')
            cardElement.innerHTML = card.text
            cardElement.addEventListener('click', () => {
                this.cardClickHandler(cardElement, mainElement, card)
            })
            mainElement.append(cardElement)

            // selecting the first card by default
            if (index === 0) {
                this.selectCard(cardElement, mainElement, card)
            }
        }

        return mainElement
    }

    /**
     * this function is responsible for handling the click on the cards
     */
    private cardClickHandler (cardElement: HTMLElement, mainElement: HTMLElement, card: CardSchemaInternal): void {
        this.selectCard(cardElement, mainElement, card)
    }

    /**
     * this function is responsible for selecting one of the cards
     */
    private selectCard (cardElement: HTMLElement, mainElement: HTMLElement, card: CardSchemaInternal): void {
        // remove the selected border color from all cards
        const cards = mainElement.querySelectorAll('.guifyCard')
        for (let index = 0; index < cards.length; index++) {
            const card = cards[index]
            card.classList.remove('guifySelectedCard')
        }

        // add the selected border color to the clicked card
        cardElement.classList.add('guifySelectedCard')

        // set the value
        this.setValue(card.value)
    }
}
