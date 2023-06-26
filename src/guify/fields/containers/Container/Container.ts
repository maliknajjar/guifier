import './Container.css'

import { Field } from '../../../fields/Field/Field'
import { drawOutlineIcon } from '../../../utils'

export abstract class Container extends Field {
    /**
     * this property tells if the current field is a big field like object, array or a rich text field
     */
    public isCollapsible = true

    /**
     * this property tells if the current field is a big field like object, array or a rich text field
     */
    public contentBody: HTMLElement = document.createElement('div')

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
     * This function is responsible for drawing the container in an object container
     *
     * @returns {HTMLElement} html element object
     */
    public drawContainer (): HTMLElement {
        const container = document.createElement('div')
        container.classList.add('guifyContainer')
        container.classList.add('guifyObjectFieldContainer')
        if (this.showSecondaryColors) {
            container.classList.add('guifySecondaryBgColor')
        } else {
            container.classList.add('guifyPrimaryBgColor')
        }

        // appending the header
        container.append(this.drawHeader())

        // adding the effect of showing buttons when hovering on the object
        const containerHeaderButtons = container.querySelector('.guifyContainerHeaderButtons') as HTMLElement
        if (containerHeaderButtons !== null) {
            Container.showHeaderButtonsWhenHovering(containerHeaderButtons, container)
        }

        return container
    }

    /**
     * This function will draw the container with its contents
     *
     * @returns {HTMLElement} html element object
     */
    public drawContentWithContainer (field: Field): HTMLElement {
        const container = (field as Container).drawContainer()
        container.append(field.draw())

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
        guifyContainerHeaderKeyName.innerHTML = `${objectName}`
        guifyContainerHeader.append(guifyContainerHeaderKeyName)

        // todo: add this part to a function
        const guifyContainerHeaderButtons = this.drawContainerHeaderButtons()
        guifyContainerHeader.append(guifyContainerHeaderButtons)

        return guifyContainerHeader
    }

    /**
     * This function is responsible for drawing the header part where we add buttons
     *
     * @returns {HTMLElement} html element object
     */
    protected drawContainerHeaderButtons (collapseButtonDown: boolean = false): HTMLElement {
        // todo: add this part to a function
        const guifyContainerHeaderButtons = document.createElement('div')
        guifyContainerHeaderButtons.classList.add('guifyContainerHeaderButtons')

        if (!this.containerInFirstLevel()) guifyContainerHeaderButtons.append(this.drawDeleteButton())
        guifyContainerHeaderButtons.append(this.drawAddButton())
        if (!this.containerInFirstLevel()) guifyContainerHeaderButtons.append(this.drawCollapseButton(collapseButtonDown))

        return guifyContainerHeaderButtons
    }

    /**
     * This function is responsible for adding the effect of showing buttons when hovering on the object
     *
     * @returns {HTMLElement} html element object
     */
    static showHeaderButtonsWhenHovering (containerHeaderButtons: HTMLElement, hoveredOnElement: HTMLElement): void {
        let timeOut: number
        hoveredOnElement.addEventListener('mouseenter', () => {
            if (containerHeaderButtons !== undefined) {
                const buttons = Array.from(containerHeaderButtons.children).reverse() as HTMLElement[]
                const timeDifference = 100
                clearTimeout(timeOut)
                buttons.forEach((button, index) => {
                    if (button.innerHTML === 'expand_less') {
                        return
                    }
                    timeOut = setTimeout(() => {
                        containerHeaderButtons.style.pointerEvents = 'all'
                        button.classList.add('guifyShowElementWithAnimation')
                    }, timeDifference * index)
                })
            }
        })

        hoveredOnElement.addEventListener('mouseleave', () => {
            if (containerHeaderButtons !== undefined) {
                const buttons = Array.from(containerHeaderButtons.children) as HTMLElement[]
                const timeDifference = 100
                clearTimeout(timeOut)
                buttons.forEach((button, index) => {
                    if (button.innerHTML === 'expand_less') {
                        return
                    }
                    timeOut = setTimeout(() => {
                        containerHeaderButtons.style.pointerEvents = 'none'
                        button.classList.remove('guifyShowElementWithAnimation')
                    }, timeDifference * index)
                })
            }
        })
    }

    /**
     * This function is responsible for drawing the collapse button for the container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawCollapseButton (rotate: boolean = false): HTMLElement {
        // creating the collapse icon
        const collapseIconElement = drawOutlineIcon('expand_less')
        collapseIconElement.classList.add('guifyContainerCollapseButton')
        if (rotate) {
            collapseIconElement.classList.add('guifyRotate')
        } else {
            collapseIconElement.classList.remove('guifyRotate')
        }

        return collapseIconElement
    }

    /**
     * This function is responsible for drawing the delete button for the container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawDeleteButton (): HTMLElement {
        const deleteIconElement = drawOutlineIcon('delete')

        return deleteIconElement
    }

    /**
     * This function is responsible for drawing the add button for the container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawAddButton (): HTMLElement {
        const iconElement = drawOutlineIcon('add')

        return iconElement
    }
}
