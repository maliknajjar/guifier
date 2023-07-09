import './dialog.css'

import type { Parameters } from '../types'
import type { dialogParameters } from './dialogTypes'

import { drawOutlineIcon, fieldsMetaData } from '../utils'
import { DataType } from '../enums'
import { Guify } from '../Guify'

export class Dialog {
    /**
     * dialog Params
     */
    readonly params: dialogParameters

    /**
     * This is the data that will be used to instantiate the guify obejct
     * to draw the second page that will be used to fill the meta data of
     * the field that will be created
     */
    private data: any

    /**
     * This is the body container element of the dialog element
     */
    private dialogContainerBody: HTMLElement = document.createElement('div')

    /**
     * This is the back arrow html element
     */
    private backIconElement: HTMLElement = document.createElement('div')

    constructor (dialogParameters: dialogParameters) {
        this.params = dialogParameters

        // adding the dialog to the main element
        this.buildGuifyDialog()
    }

    /**
     * This function sets dialog's data
     */
    public setDialogData (data: any): void {
        this.data = data
    }

    /**
     * This is the function resposible to show the dialog element in the
     * the selected element with the chosen Id
     */
    private buildGuifyDialog (): void {
        const mainElement = document.querySelector(`#${this.params.elementId} > .guifyMainWrapper`)
        if (mainElement !== null) {
            mainElement.append(this.drawdialog())
        }
    }

    /**
     * This function is responsible for drawing the dialog element
     */
    private drawdialog (): HTMLElement {
        // drawing the background of the dialog element
        const guifyDialogBackgroundContainer = document.createElement('div')
        guifyDialogBackgroundContainer.classList.add('guifyDialogBackgroundContainer')

        // hiding the dialog
        guifyDialogBackgroundContainer.classList.toggle('guifyNoneDisplay')

        // drawing the dialog itself
        guifyDialogBackgroundContainer.append(this.drawdialogContainer())

        return guifyDialogBackgroundContainer
    }

    /**
     * This function is responsible for drawing the dialog container element
     */
    private drawdialogContainer (): HTMLElement {
        // drawing the dialog itself
        const guifyDialogContainer = document.createElement('div')
        guifyDialogContainer.classList.add('guifyDialogContainer')

        // drawing dialog title
        const dialogTitle = document.createElement('div')
        dialogTitle.classList.add('guifyDialogContainerTitle')
        dialogTitle.append('New Field')
        dialogTitle.append(drawOutlineIcon('add'))
        guifyDialogContainer.append(dialogTitle)

        // draw an back icon
        const backIcon = document.createElement('div')
        backIcon.classList.add('guifyDialogBackIcon')
        backIcon.addEventListener('click', () => {
            this.dialogContainerBody.innerHTML = ''
            this.dialogContainerBody.append(this.drawfieldsGrid())
            this.dialogContainerBody.classList.toggle('guifyRemovePadding')
            this.toggleBackArrowDisplay()
        })
        backIcon.append(drawOutlineIcon('arrow_back'))
        this.backIconElement = backIcon
        this.toggleBackArrowDisplay()
        dialogTitle.append(backIcon)

        const dialogBody = document.createElement('div')
        dialogBody.classList.add('guifyDialogContainerBody')
        this.dialogContainerBody = dialogBody
        dialogBody.append(this.drawfieldsGrid())
        guifyDialogContainer.append(this.dialogContainerBody)

        return guifyDialogContainer
    }

    /**
     * This function is responsible for drawing the fields grid page
     */
    private drawfieldsGrid (): HTMLElement {
        // drawing dialog body
        const fieldsGridContainer = document.createElement('div')
        fieldsGridContainer.classList.add('guifyGridFieldContainer')
        for (const key in fieldsMetaData) {
            const element = fieldsMetaData[key]
            fieldsGridContainer.append(this.drawGridField(element.labelName))
        }

        return fieldsGridContainer
    }

    /**
     * This function is responsible for drawing a grid element
     */
    private drawGridField (labelName: string): HTMLElement {
        // drawing the dialog itself
        const guifyDialogContainerBodyElement = document.createElement('div')
        guifyDialogContainerBodyElement.classList.add('guifyDialogContainerBodyElement')
        guifyDialogContainerBodyElement.append(labelName)

        guifyDialogContainerBodyElement.addEventListener('click', () => {
            this.dialogContainerBody.innerHTML = ''
            this.dialogContainerBody.append(this.drawGuifyGeneratedContent())
            this.dialogContainerBody.classList.toggle('guifyRemovePadding')
            this.toggleBackArrowDisplay()
        })

        return guifyDialogContainerBodyElement
    }

    /**
     * This function is responsible for drawing a grid element
     */
    private drawGuifyGeneratedContent (): HTMLElement {
        const params: Parameters = {
            elementId: this.params.elementId,
            data: this.data,
            dataType: DataType.Js,
            withoutContainer: true,
            flipBackgroundColors: true
        }
        const guify = new Guify(params)
        const generatedHtmlFromData = guify.getGeneratedHtmlElement()

        const guifyGeneratedContent = document.createElement('div')
        guifyGeneratedContent.classList.add('guifyGeneratedContent')
        guifyGeneratedContent.append(generatedHtmlFromData)

        return guifyGeneratedContent
    }

    /**
     * This function toggles the display of a back Icon
     */
    private toggleBackArrowDisplay (): void {
        this.backIconElement.classList.toggle('guifyNoneDisplay')
    }
}
