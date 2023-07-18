import './style.css'

import type { Parameters } from './guify/types'
import { DataType } from './guify/enums'
import { Guify } from './guify/Guify'
import { exampleData } from './dataExamples'

async function init (): Promise<void> {
    const params: Parameters = {
        elementId: 'app',
        data: exampleData,
        dataType: DataType.Json
    }

    const guify = new Guify(params)

    document.addEventListener('click', () => {
        console.log('wowowoow')
        guify.setData([121, 6565, 112], DataType.Js)
    })
}

void init()
