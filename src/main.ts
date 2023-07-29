import './style.css'

import type { Parameters } from './guifier/types'
import Guifier from './guifier/Guifier'
import { exampleData } from './dataExamples'

async function init (): Promise<void> {
    const params: Parameters = {
        elementId: 'app',
        data: exampleData,
        dataType: 'json',
        onChange: () => {
            console.log('data has changed')
        }
    }

    const guifier = new Guifier(params)

    document.addEventListener('keydown', (e) => {
        // press on s key on the keyboard to show the big Data object
        if (e.keyCode === 83) {
            console.log('printing the Data object')
            console.log(guifier.getData('json'))
        }
    })
}

void init()
