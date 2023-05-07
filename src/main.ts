import type { GuifyParameters } from './guify/types'
import { GuifyDataType } from './guify/enums'
import { Guify } from './guify/Guify'
import { exampleData } from './dataExamples'

import './style.css'

const params: GuifyParameters = {
    elementId: 'app',
    data: exampleData,
    dataType: GuifyDataType.Json
}

const guify = new Guify(params)
