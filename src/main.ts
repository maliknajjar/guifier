import './style.css'

import type { Parameters } from './guifier/types'
import { DataType } from './guifier/enums'
import Guifier from './guifier/Guifier'
import { exampleData } from './dataExamples'

async function init (): Promise<void> {
    const params: Parameters = {
        elementSelector: '#app',
        data: exampleData,
        dataType: DataType.Xml,
        onChange: () => {
            console.log('guifier has changed')
            console.log(guifier.getData(DataType.Xml))
        }
    }

    const guifier = new Guifier(params)

    document.addEventListener('keydown', (e) => {
        // press on s key on the keyboard to show the big Data object
        if (e.keyCode === 83) {
            console.log('printing the Data object')
            console.log(guifier.getData(DataType.Xml))
            // guifier.setData('{"sasa":null}', DataType.Json)
        }
    })
}

void init()
