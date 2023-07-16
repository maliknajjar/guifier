import './dialog.css'

import type { Parameters } from '../types'
import type { DialogParameters } from './dialogTypes'

import { drawOutlineIcon, fieldsMetaData } from '../utils'
import { DataType } from '../enums'
import { Guify } from '../Guify'

export class Dialog {
    /**
     * dialog Params
     */
    readonly params: DialogParameters

    /**
     * This is the data that will be used to instantiate the guify obejct
     * to draw the second page that will be used to fill the meta data of
     * the field that will be created
     */
    private data: any

    /**
     * This is the data that will be used to instantiate the guify obejct
     * to draw the second page that will be used to fill the meta data of
     * the field that will be created
     */
    private guify: Guify | null = null

    /**
     * This is the body container element of the dialog element
     */
    private dialogContainerBody: HTMLElement = document.createElement('div')

    /**
     * This is the whole dialog element
     */
    private dialogElement: HTMLElement = document.createElement('div')

    /**
     * This is the back arrow html element
     */
    private guifyGeneratedContent: HTMLElement = document.createElement('div')

    /**
     * This is the Cancel Button html element
     */
    private cancelButton: HTMLElement = document.createElement('div')

    /**
     * This is the Confirm Button html element
     */
    private confirmButton: HTMLElement = document.createElement('div')

    constructor (dialogParameters: dialogParameters) {
        this.params = dialogParameters

        // adding the dialog to the main element
        this.buildGuifyDialog()

        // TODO: make it hidden by default
        // hiding the dialog
        this.hideDialog()
    }

    /**
     * This function shows dialog and returns data
     * @returns the data of click on confirm or returns null if clicked on cancel
     */
    public async get (data: any): Promise<any | null> {
        this.data = data
        this.guifyGeneratedContent = this.drawGuifyGeneratedContent(data)
        this.dialogContainerBody.append(this.guifyGeneratedContent)
        this.showDialog()
        return await new Promise((resolve) => {
            this.confirmButton.addEventListener('click', () => {
                resolve(this.guify.getData())
                this.hideDialog()
            })
            this.cancelButton.addEventListener('click', () => {
                resolve(null)
                this.hideDialog()
            })
        })
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
        this.dialogElement = guifyDialogBackgroundContainer

        // drawing the dialog itself
        guifyDialogBackgroundContainer.append(this.drawdialogContainer())

        // hide dialog if clicked on background element
        guifyDialogBackgroundContainer.addEventListener('click', (e) => {
            const element = e.target as HTMLElement
            if (element.classList.contains('guifyDialogBackgroundContainer')) {
                this.hideDialog()
            }
        })

        return guifyDialogBackgroundContainer
    }

    /**
     * This function is responsible for showing the dialog
     */
    private showDialog (): void {
        this.dialogElement.classList.remove('guifyNoneDisplay')
    }

    /**
     * This function is responsible for hiding the dialog
     */
    private hideDialog (): void {
        this.dialogElement.classList.add('guifyNoneDisplay')
        this.clearGuifyGeneratedContent()
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
        dialogTitle.append(this.params.dialogTitle)
        dialogTitle.append(drawOutlineIcon('add'))
        guifyDialogContainer.append(dialogTitle)

        // the content part of the dialog
        const dialogBody = document.createElement('div')
        dialogBody.classList.add('guifyDialogContainerBody')
        this.dialogContainerBody = dialogBody
        guifyDialogContainer.append(this.dialogContainerBody)

        // the content part of the dialog
        const footer = document.createElement('div')
        footer.classList.add('guifyDialogFooter')

        const cancelButton = document.createElement('div')
        cancelButton.classList.add('guifyDialogCancelButton')
        cancelButton.classList.add('guifyDialogButton')
        cancelButton.append('Cancel')
        this.cancelButton = cancelButton
        footer.append(cancelButton)

        const confirmButton = document.createElement('div')
        confirmButton.classList.add('guifyDialogConfirmButton')
        confirmButton.classList.add('guifyDialogButton')
        confirmButton.append('Confirm')
        this.confirmButton = confirmButton
        footer.append(confirmButton)

        guifyDialogContainer.append(footer)

        return guifyDialogContainer
    }

    /**
     * This function is responsible for drawing a grid element
     */
    private drawGuifyGeneratedContent (data: any): HTMLElement {
        const params: Parameters = {
            elementId: this.params.elementId,
            data,
            dataType: DataType.Js,
            withoutContainer: true,
            flipBackgroundColors: true,
            expandFieldsToFullWidth: true
        }
        this.guify = new Guify(params)
        const generatedHtmlFromData = this.guify.getGeneratedHtmlElement()

        const guifyGeneratedContent = document.createElement('div')
        guifyGeneratedContent.classList.add('guifyGeneratedContent')
        guifyGeneratedContent.append(generatedHtmlFromData)

        return guifyGeneratedContent
    }

    /**
     * This function clears the guifyGeneratedContent element
     */
    private clearGuifyGeneratedContent (): void {
        this.guifyGeneratedContent.innerHTML = ''
    }

    /**
     * This function will show a dialog and return its data
     *
     * @param {any} data is the data you want the user to set in the dialog
     * @param {DialogParameters} params is the parameter of the dialog
     * @returns the data of click on confirm or returns null if clicked on cancel
     */
    public static async get (data: any, params: DialogParameters): Promise<any | null> {
        const dialogParams = params
        const dialog = new Dialog(dialogParams)
        return await dialog.get(data)
    }
}
