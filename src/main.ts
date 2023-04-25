import './style.css'

import type { GuifyParameters } from './guify/types/guify'
import { GuifyDataType } from './guify/enums/guify'
import { Guify } from './guify/guify'

import { exampleData } from './dataExamples'

const params: GuifyParameters = {
    elementId: 'app',
    data: exampleData,
    dataType: GuifyDataType.Json
}

const guify = new Guify(params)
