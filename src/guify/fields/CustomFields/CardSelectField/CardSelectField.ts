import './style.css'

import { localParamSchema, type LocalParamInternal } from './types'

import { Field } from '../../Field/Field'

export class CardSelectField extends Field {
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
        const mainELement = document.createElement('div')
        mainELement.classList.add('guifyCardsContainer')

        // drawing cards
        for (let index = 0; index < this.localParam.cards.length; index++) {
            const card = this.localParam.cards[index]
            const cardElement = document.createElement('div')
            cardElement.classList.add('guifyCard')
            cardElement.innerHTML = card.text
            mainELement.append(cardElement)
        }

        return mainELement
    }
}
