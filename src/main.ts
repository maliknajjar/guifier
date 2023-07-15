import type { Parameters } from './guify/types'
import { DataType } from './guify/enums'
import { Guify } from './guify/Guify'
import { exampleData } from './dataExamples'

import './style.css'

async function init (): Promise<void> {
    const params: Parameters = {
        elementId: 'app',
        data: exampleData,
        dataType: DataType.Json,
        expandFieldsToFullWidth: true
    }

    const guify = new Guify(params)
    guify.drawGeneratedHtmlElement()
}

void init()
