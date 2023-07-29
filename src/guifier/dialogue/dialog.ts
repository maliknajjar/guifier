import './dialog.css'

import type { ParametersInternal } from '../types'
import type { DialogParameters } from './dialogTypes'

import { drawOutlineIcon } from '../utils'
import { DataType } from '../enums'
import Guifier from '../Guifier'
import lodash from 'lodash'

export class Dialog {
    /**
     * dialog Params
     */
    readonly params: DialogParameters

    /**
     * This is the data that will be used to instantiate the guifier obejct
     * to draw the second page that will be used to fill the meta data of
     * the field that will be created
     */
    private data: any

    /**
     * This is the data that will be used to instantiate the guifier obejct
     * to draw the second page that will be used to fill the meta data of
     * the field that will be created
     */
    private guifier: Guifier | null = null

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
    private guifierGeneratedContent: HTMLElement = document.createElement('div')

    /**
     * This is the Cancel Button html element
     */
    private cancelButton: HTMLElement = document.createElement('div')

    /**
     * This is the Confirm Button html element
     */
    private confirmButton: HTMLElement = document.createElement('div')

    constructor (dialogParameters: DialogParameters) {
        this.params = dialogParameters

        // adding the dialog to the main element
        this.buildGuifierDialog()

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
        this.guifierGeneratedContent = this.drawGuifierGeneratedContent(this.data)
        this.dialogContainerBody.append(this.guifierGeneratedContent)
        this.showDialog()
        return await new Promise((resolve) => {
            this.confirmButton.addEventListener('click', () => {
                const data = this.guifier?.getData(DataType.Js)
                for (const key in data) {
                    const value = data[key]
                    if (lodash.isEmpty(value)) {
                        alert('Please ensure that all required fields have been completed.')
                        return
                    }
                }
                resolve(data)
                this.hideDialog()
                setTimeout(() => {
                    this.removeDialog()
                }, 150)
            })
            this.cancelButton.addEventListener('click', () => {
                resolve(null)
                this.hideDialog()
                setTimeout(() => {
                    this.removeDialog()
                }, 150)
            })
        })
    }

    /**
     * This is the function resposible to show the dialog element in the
     * the selected element with the chosen Id
     */
    private buildGuifierDialog (): void {
        const mainElement = document.querySelector(this.params.elementSelector)
        if (mainElement !== null) {
            mainElement.append(this.drawdialog())
        }
    }

    /**
     * This function is responsible for drawing the dialog element
     */
    private drawdialog (): HTMLElement {
        // drawing the background of the dialog element
        const guifierDialogBackgroundContainer = document.createElement('div')
        guifierDialogBackgroundContainer.classList.add('guifierDialogBackgroundContainer')
        this.dialogElement = guifierDialogBackgroundContainer

        // drawing the dialog itself
        guifierDialogBackgroundContainer.append(this.drawDialogContainer())

        // hide dialog if clicked on background element
        guifierDialogBackgroundContainer.addEventListener('click', (e) => {
            const element = e.target as HTMLElement
            if (element.classList.contains('guifierDialogBackgroundContainer')) {
                this.hideDialog()
                setTimeout(() => {
                    this.removeDialog()
                }, 150)
            }
        })

        return guifierDialogBackgroundContainer
    }

    /**
     * This function is responsible for showing the dialog
     */
    private showDialog (): void {
        setTimeout(() => {
            this.dialogElement.classList.remove('guifierOpacityZero')
        }, 0)
    }

    /**
     * This function is responsible for hiding the dialog
     */
    private hideDialog (): void {
        this.dialogElement.classList.add('guifierOpacityZero')
        this.clearGuifierGeneratedContent()
    }

    /**
     * This function is responsible for removing the dialog
     */
    private removeDialog (): void {
        this.dialogContainerBody.parentElement?.parentElement?.remove()
    }

    /**
     * This function is responsible for drawing the dialog container element
     */
    private drawDialogContainer (): HTMLElement {
        // drawing the dialog itself
        const guifierDialogContainer = document.createElement('div')
        guifierDialogContainer.classList.add('guifierDialogContainer')

        // drawing dialog title
        const dialogTitle = document.createElement('div')
        dialogTitle.classList.add('guifierDialogContainerTitle')
        dialogTitle.append(this.params.dialogTitle)
        dialogTitle.append(drawOutlineIcon('add'))
        guifierDialogContainer.append(dialogTitle)

        // the content part of the dialog
        const dialogBody = document.createElement('div')
        dialogBody.classList.add('guifierDialogContainerBody')
        this.dialogContainerBody = dialogBody
        guifierDialogContainer.append(this.dialogContainerBody)

        // the content part of the dialog
        const footer = document.createElement('div')
        footer.classList.add('guifierDialogFooter')

        const cancelButton = document.createElement('div')
        cancelButton.classList.add('guifierDialogCancelButton')
        cancelButton.classList.add('guifierDialogButton')
        cancelButton.append('Cancel')
        this.cancelButton = cancelButton
        footer.append(cancelButton)

        const confirmButton = document.createElement('div')
        confirmButton.classList.add('guifierDialogConfirmButton')
        confirmButton.classList.add('guifierDialogButton')
        confirmButton.append('Confirm')
        this.confirmButton = confirmButton
        footer.append(confirmButton)

        guifierDialogContainer.append(footer)

        return guifierDialogContainer
    }

    /**
     * This function is responsible for drawing a grid element
     */
    private drawGuifierGeneratedContent (data: any): HTMLElement {
        const params: ParametersInternal = {
            elementSelector: this.params.elementSelector,
            data,
            dataType: DataType.Js,
            withoutContainer: true,
            flipBackgroundColors: true,
            expandFieldsToFullWidth: true,
            readOnlyMode: true
        }
        this.guifier = new Guifier(params)
        const generatedHtmlFromData = this.guifier.getGeneratedHtmlElement()

        const guifierGeneratedContent = document.createElement('div')
        guifierGeneratedContent.classList.add('guifierGeneratedContent')
        guifierGeneratedContent.append(generatedHtmlFromData)

        return guifierGeneratedContent
    }

    /**
     * This function clears the guifierGeneratedContent element
     */
    private clearGuifierGeneratedContent (): void {
        this.guifierGeneratedContent.innerHTML = ''
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
