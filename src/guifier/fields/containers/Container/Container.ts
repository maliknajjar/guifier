import './Container.css'

import type { ObjectContainer } from '../ObjectContainer/ObjectContainer'
import type { ArrayContainer } from '../ArrayContainer/ArrayContainer'

import { Field } from '../../../fields/Field/Field'
import { drawOutlineIcon } from '../../../utils'

export abstract class Container extends Field {
    /**
     * this is name of the field internaly
     */
    public static fieldName: string = 'container'

    /**
     * this is the label name thats shown for users
     */
    public static fieldLabelName: string = 'Container'

    /**
     * this property tells if the current field is a big field like object, array or a rich text field
     */
    public isCollapsible = true

    /**
     * this property sets the space an object will take in a grid
     */
    public gridSpace = 2

    /**
     * this property tells if the current field is a big field like object, array or a rich text field
     */
    public containerLength: number = 0

    /**
     * this property tells if the current field is a big field like object, array or a rich text field
     */
    public contentBody: HTMLElement = document.createElement('div')

    /**
     * This method is responsible for drawing the body when the container is empty
     *
     * @returns {HTMLElement} html element object
     */
    protected drawEmptyContent (forArrayContainer: boolean = false): HTMLElement {
        const pluralText = forArrayContainer ? 'Elements' : 'Properties'
        const singularText = forArrayContainer ? 'Element' : 'Property'

        const emptyContentContianer = document.createElement('div')
        emptyContentContianer.classList.add('guifierEmptyContentContianer')

        // drawing wrapper on the content of the emptyContentContianer
        const emptyContentContianerWrapper = document.createElement('div')
        emptyContentContianerWrapper.classList.add('emptyContentContianerWrapper')
        emptyContentContianer.append(emptyContentContianerWrapper)

        const mainMessage = document.createElement('h2')
        mainMessage.classList.add('guifierEmptyTitle')
        mainMessage.append(`No ${pluralText}`)
        emptyContentContianerWrapper.append(mainMessage)

        const paragraph = document.createElement('p')
        paragraph.classList.add('guifierEmptyParagraph')
        paragraph.append(`You don’t have any ${pluralText} yet. Click the button below to add one.`)
        emptyContentContianerWrapper.append(paragraph)

        const addELementButton = document.createElement('div')
        addELementButton.classList.add('guifierEmptyButton')
        addELementButton.append(`Add ${singularText}`)
        addELementButton.append(this.drawAddButton())
        addELementButton.addEventListener('click', (): void => {
            console.log(forArrayContainer)
            Promise.resolve().then(async () => {
                if (forArrayContainer) {
                    const container = (this as unknown as ArrayContainer)
                    await container.letUserAddElement()
                } else {
                    const container = (this as unknown as ObjectContainer)
                    await container.letUserAddProperty()
                }
            }).catch((error) => {
                console.error(error)
            })
        })
        emptyContentContianerWrapper.append(addELementButton)

        return emptyContentContianer
    }

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
        container.classList.add('guifierContainer')
        container.classList.add('guifierObjectFieldContainer')
        container.style.gridColumn = `span ${this.gridSpace}`
        if (this.showSecondaryColors) {
            container.classList.add('guifierSecondaryBgColor')
        } else {
            container.classList.add('guifierPrimaryBgColor')
        }

        // appending the header
        container.append(this.drawHeader())

        // adding the effect of showing buttons when hovering on the object
        const containerHeaderButtons = container.querySelector('.guifierContainerHeaderButtons') as HTMLElement
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
    public drawContentWithContainer (): HTMLElement {
        const container = this.drawContainer()
        container.append(this.draw())

        return container
    }

    /**
     * This function is responsible for drawing the header for a container field
     *
     * @returns {HTMLElement} html element object
     */
    protected drawHeader (): HTMLElement {
        const guifierContainerHeader = document.createElement('div')
        guifierContainerHeader.classList.add('guifierContainerHeader')
        guifierContainerHeader.classList.add('guifierPrimaryBottomBorder')

        // creating the key part of the header
        const objectName = this.property._key
        const guifierContainerHeaderKeyName = document.createElement('div')
        guifierContainerHeaderKeyName.classList.add('guifierContainerHeaderKeyName')
        guifierContainerHeaderKeyName.innerHTML = `${objectName}`
        guifierContainerHeader.append(guifierContainerHeaderKeyName)

        // todo: add this part to a function
        const guifierContainerHeaderButtons = this.drawContainerHeaderButtons()
        guifierContainerHeader.append(guifierContainerHeaderButtons)

        return guifierContainerHeader
    }

    /**
     * This function is responsible for drawing the header part where we add buttons
     *
     * @returns {HTMLElement} html element object
     */
    public drawContainerHeaderButtons (collapseButtonDown: boolean = false): HTMLElement {
        // todo: add this part to a function
        const guifierContainerHeaderButtons = document.createElement('div')
        guifierContainerHeaderButtons.classList.add('guifierContainerHeaderButtons')

        if (!this.params.readOnlyMode) {
            if (!this.containerInFirstLevel()) guifierContainerHeaderButtons.append(this.drawDeleteButton())
            guifierContainerHeaderButtons.append(this.drawAddButton())
        }
        if (!this.containerInFirstLevel()) guifierContainerHeaderButtons.append(this.drawCollapseButton(collapseButtonDown))

        return guifierContainerHeaderButtons
    }

    /**
     * This function is responsible for adding the effect of showing buttons when hovering on the object
     *
     * @returns {HTMLElement} html element object
     */
    static showHeaderButtonsWhenHovering (containerHeaderButtons: HTMLElement, hoveredOnElement: HTMLElement, rightToLeft = false): void {
        let timeOut: number
        hoveredOnElement.addEventListener('mouseenter', () => {
            if (containerHeaderButtons !== undefined) {
                const buttons = rightToLeft ? Array.from(containerHeaderButtons.children) : Array.from(containerHeaderButtons.children).reverse() as HTMLElement[]
                const timeDifference = 50
                clearTimeout(timeOut)
                buttons.forEach((button, index) => {
                    if (button.innerHTML === 'expand_less') {
                        return
                    }
                    timeOut = setTimeout(() => {
                        containerHeaderButtons.style.pointerEvents = 'all'
                        button.classList.add('guifierShowElementWithAnimation')
                    }, timeDifference * index)
                })
            }
        })

        hoveredOnElement.addEventListener('mouseleave', () => {
            if (containerHeaderButtons !== undefined) {
                const buttons = rightToLeft ? Array.from(containerHeaderButtons.children).reverse() : Array.from(containerHeaderButtons.children) as HTMLElement[]
                const timeDifference = 100
                clearTimeout(timeOut)
                buttons.forEach((button, index) => {
                    if (button.innerHTML === 'expand_less') {
                        return
                    }
                    timeOut = setTimeout(() => {
                        containerHeaderButtons.style.pointerEvents = 'none'
                        button.classList.remove('guifierShowElementWithAnimation')
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
        collapseIconElement.classList.add('guifierContainerCollapseButton')
        if (rotate) {
            collapseIconElement.classList.add('guifierRotate')
        } else {
            collapseIconElement.classList.remove('guifierRotate')
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
