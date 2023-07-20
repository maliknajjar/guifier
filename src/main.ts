import './style.css'

import type { Parameters } from './guify/types'
import { DataType } from './guify/enums'
import { Guify } from './guify/Guify'
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

    const guify = new Guify(params)

    document.addEventListener('click', () => {
        console.log('wowoowowowowowowowoowo')
        console.log(guify.getData(DataType.Toml))
    })
}

void init()
