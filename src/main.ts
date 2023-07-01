import type { Parameters } from './guify/types'
import { DataType } from './guify/enums'
import { Guify } from './guify/Guify'
import { exampleData } from './dataExamples'

import './style.css'

const params: Parameters = {
    elementId: 'app',
    data: exampleData,
    dataType: DataType.Json
}

const guify = new Guify(params)

console.log(guify.getData())

// document.addEventListener('click', () => {
//     console.log(guify.getData())
// })
