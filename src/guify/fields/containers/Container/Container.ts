import './Container.css'

import { Field } from '../../../fields/Field/Field'
import { drawOutlineIcon } from '../../../utils'

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

        // adding the effect of showing buttons when hovering on the object
        this.showHeaderButtonsWhenHovering(container)

        return container
    }

    /**
     * This function is responsible for adding the effect of showing buttons when hovering on the object
     *
     * @returns {HTMLElement} html element object
     */
    // TODO: Make the arrayContainer object use this function add animation
    // TODO: and draw the delete and the add button on the container too
    private showHeaderButtonsWhenHovering (container: HTMLElement): void {
        container.addEventListener('mouseenter', () => {
            const containerHeaderButtons = container.children[0].children[1]
            if (containerHeaderButtons !== undefined) {
                const buttons = Array.from(containerHeaderButtons.children).reverse()
                const timeDifference = 100
                let time = timeDifference
                buttons.forEach(button => {
                    if (button.innerHTML === 'expand_less') {
                        return
                    }
                    setTimeout(() => {
                        button.classList.add('guifyContainerHeaderShow')
                    }, time)
                    time += timeDifference
                })
            }
        })

        container.addEventListener('mouseleave', () => {
            const containerHeaderButtons = container.children[0].children[1]
            if (containerHeaderButtons !== undefined) {
                const buttons = Array.from(containerHeaderButtons.children)
                const timeDifference = 100
                let time = timeDifference
                buttons.forEach(button => {
                    if (button.innerHTML === 'expand_less') {
                        return
                    }
                    setTimeout(() => {
                        button.classList.remove('guifyContainerHeaderShow')
                    }, time)
                    time += timeDifference
                })
            }
        })
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

        if (!this.containerInFirstLevel()) {
            const guifyObjectContainerHeader = document.createElement('div')
            guifyObjectContainerHeader.classList.add('guifyContainerHeaderButtons')
            // we add the buttons of the container here
            guifyObjectContainerHeader.append(this.drawDeleteButton())
            guifyObjectContainerHeader.append(this.drawAddButton())
            guifyObjectContainerHeader.append(this.drawCollapseButton())
            guifyContainerHeader.append(guifyObjectContainerHeader)
        }

        return guifyContainerHeader
    }

    /**
     * This function is responsible for drawing the collapse button for the container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawCollapseButton (forArray: boolean = false, rotate: boolean = false): HTMLElement {
        // creating the collapse icon
        const collapseIconElement = drawOutlineIcon('expand_less')
        collapseIconElement.classList.add('guifyContainerCollapseButton')
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

    /**
     * This function is responsible for drawing the delete button for the container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawDeleteButton (forArray: boolean = false): HTMLElement {
        const deleteIconElement = drawOutlineIcon('delete')

        // adding the event listener
        deleteIconElement.addEventListener('click', () => {
            this.data.removeProperty(this.property._path)
            deleteIconElement.parentElement?.parentElement?.parentElement?.remove()
        })

        return deleteIconElement
    }

    /**
     * This function is responsible for drawing the add button for the container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawAddButton (forArray: boolean = false): HTMLElement {
        const iconElement = drawOutlineIcon('add')

        // adding the event listener
        iconElement.addEventListener('click', () => {
            // TODO
        })

        return iconElement
    }
}
