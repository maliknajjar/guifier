import './Container.css'

import { Field } from '../../../fields/Field/Field'

export abstract class Container extends Field {
    /**
     * this property tells if the current field is a big field like object, array or a rich text field
     */
    public isCollapsible = true

    /**
     * this method checks if the current container is the
     * first container and its not a nested container
     *
     * @returns {HTMLElement} html element object
     */
    protected containerInFirstLevel (): boolean {
        return this.property._path.length === 1
    }

    /**
     * This function is responsible for drawing the container for a container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawContainer (): HTMLElement {
        const container = document.createElement('div')
        container.classList.add('guifyContainer')
        if (this.showSecondaryColors) {
            container.classList.add('guifySecondaryBgColor')
        } else {
            container.classList.add('guifyPrimaryBgColor')
        }

        // appending the header
        container.append(this.drawHeader())

        return container
    }

    /**
     * This function is responsible for drawing the header for a container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawHeader (): HTMLElement {
        const guifyContainerHeader = document.createElement('div')
        guifyContainerHeader.classList.add('guifyContainerHeader')
        guifyContainerHeader.classList.add('guifyPrimaryBottomBorder')

        // creating the key part of the header
        const objectName = this.property._key
        const guifyContainerHeaderKeyName = document.createElement('div')
        guifyContainerHeaderKeyName.classList.add('guifyContainerHeaderKeyName')
        guifyContainerHeaderKeyName.innerHTML = objectName
        guifyContainerHeader.append(guifyContainerHeaderKeyName)

        // creating the buttons part of the header
        if (!this.containerInFirstLevel()) {
            const guifyObjectContainerHeader = document.createElement('div')
            guifyObjectContainerHeader.classList.add('guifyContainerHeaderButtons')
            guifyObjectContainerHeader.append(this.drawCollapseIcon())
            guifyContainerHeader.append(guifyObjectContainerHeader)
        }

        return guifyContainerHeader
    }

    /**
     * This function is responsible for drawing the collapse Icon for a container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawCollapseIcon (rotate: boolean = false, forArray: boolean = false): HTMLElement {
        // creating the collapse icon
        const collapseIconElement = document.createElement('i')
        collapseIconElement.classList.add('guifyPrimaryTextColor')
        collapseIconElement.classList.add('guifyPrimaryTextMediumSize')
        collapseIconElement.classList.add('fa-solid')
        collapseIconElement.classList.add('fa-chevron-up')
        if (rotate) {
            collapseIconElement.classList.add('guifyRotate')
        } else {
            collapseIconElement.classList.remove('guifyRotate')
        }
        collapseIconElement.addEventListener('click', () => {
            let bodyElement = document.createElement('div')
            let headerElement = document.createElement('div')
            if (forArray) {
                bodyElement = collapseIconElement.parentElement?.parentElement?.parentElement?.parentElement?.nextElementSibling as HTMLDivElement
            } else {
                bodyElement = collapseIconElement.parentElement?.parentElement?.nextElementSibling as HTMLDivElement
                headerElement = collapseIconElement.parentElement?.parentElement as HTMLDivElement
                headerElement.classList.toggle('guifyPrimaryBottomBorder')
            }
            collapseIconElement.classList.toggle('guifyRotate')
            bodyElement.classList.toggle('guifyNoneDisplay')
        })

        return collapseIconElement
    }
}
