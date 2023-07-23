import './style.css'

import type { Parameters } from './guifier/types'
import { DataType } from './guifier/enums'
import Guifier from './guifier/Guifier'
import { exampleData } from './dataExamples'

async function init (): Promise<void> {
    const params: Parameters = {
        elementId: 'app',
        data: exampleData,
        dataType: DataType.Toml,
        onChange: () => {
            console.log('data has changed')
        }
    }

    const guifier = new Guifier(params)

    document.addEventListener('click', () => {
        console.log('wowoowowowowowowowoowo')
        console.log(guifier.getData(DataType.Toml))
    })
}

void init()
