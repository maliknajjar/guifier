import './style.css'

import type { Parameters } from './guifier/types'
import { DataType } from './guifier/enums'
import Guifier from './guifier/Guifier'
import { exampleData } from './dataExamples'

async function init (): Promise<void> {
    const params: Parameters = {
        elementId: 'app',
        data: exampleData,
        dataType: DataType.Json,
        onChange: () => {
            console.log('data has changed')
        }
    }

    const guifier = new Guifier(params)

    document.addEventListener('keydown', (e) => {
        // press on s key on the keyboard to show the big Data object
        if (e.keyCode === 83) {
            console.log('XXXXXXXXXXXXXXXXXXXXX')
            console.log(guifier.getData(DataType.Json))
        }
    })
}

void init()
