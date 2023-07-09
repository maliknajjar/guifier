import type { Parameters } from './guify/types'
import { DataType } from './guify/enums'
import { Guify } from './guify/Guify'
import { Dialog } from './guify/dialogue/dialog'
import { exampleData } from './dataExamples'

import './style.css'

const params: Parameters = {
    elementId: 'app',
    data: exampleData,
    dataType: DataType.Json
}

const guify = new Guify(params)
guify.drawGeneratedHtmlElement()

console.log(guify.getData())

const dialogParams = {
    elementId: params.elementId
}
const dialogueData = {
    'Field Name': 'name',
    'Field Value': 'value',
    'Field Type': 'text'
}
const dialog = new Dialog(dialogParams)
dialog.setDialogData(dialogueData)

// document.addEventListener('click', () => {
//     console.log(guify.getData())
// })
