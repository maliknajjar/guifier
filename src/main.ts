import './style.css'

import type { GuifyParameters } from './guify/types'
import { GuifyDataType } from './guify/enums'
import { Guify } from './guify/classes/Guify/guify'

import { exampleData } from './dataExamples'

const params: GuifyParameters = {
    elementId: 'app',
    data: exampleData,
    dataType: GuifyDataType.Json
}

const guify = new Guify(params)
