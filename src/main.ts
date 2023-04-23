import type { GuifyParameters } from './guify/types/guify'
import { GuifyDataType } from './guify/enums/guify'
import { Guify } from './guify/guify'

import './style.css'

import { example_data } from './data_examples'

const params: GuifyParameters = {
    elementId: 'app',
    data: example_data,
    dataType: GuifyDataType.JsObject
}

const guify = new Guify(params)

console.log(guify)
