import 'material-icons/iconfont/outlined.css'

import { computePosition, flip, offset, shift } from '@floating-ui/dom'
import lodash from 'lodash'

import type { AnyObject, Property, FieldsMetaData, ParametersInternal } from './types'
import type { Field } from './fields/Field/Field'
import type { Data } from './classes/Data'

import { PrimitiveTypes } from './enums'

// fields
import { ObjectContainer } from './fields/containers/ObjectContainer/ObjectContainer'
import { ArrayContainer } from './fields/containers/ArrayContainer/ArrayContainer'
import { TextField } from './fields/baseFields/TextField/TextField'
import { NumberField } from './fields/baseFields/NumberField/NumberField'
import { BooleanField } from './fields/baseFields/BooleanField/BooleanField'
import { NullField } from './fields/baseFields/NullField/NullField'
import { CardSelectField } from './fields/CustomFields/CardSelectField/CardSelectField'
import { DateField } from './fields/baseFields/DateField/DateField'

/**
 * A function that tells you wether a number is odd or even
 *
 * @param {any} number is the number you want to know if its odd or even
 * @returns {boolean} weather the number is odd or even
 */
export function isOdd (number: number): boolean {
    return number % 2 !== 0
}

/**
 * A function that returns the type of any value passed to it
 * These are the list of the supported types by this function:
 * - "string": for string values
 * - "number": for numeric values, including integers, decimals, and the special values Infinity and -Infinity
 * - "boolean": for boolean values (true or false)
 * - "object": for object values, including arrays and non-null objects
 * - "array": for arrays
 * - "null": for the value null
 * - "undefined": for the value undefined
 * - "NaN": for the special value NaN
 *
 * @param {any} value is the variable or property you want to get it's type
 * @returns {string} the type
 */
export function getType (value: any): PrimitiveTypes {
    const type = typeof value

    if (type === PrimitiveTypes.Object) {
        if (Array.isArray(value)) {
            return PrimitiveTypes.Array
        } else if (lodash.isDate(value)) {
            return PrimitiveTypes.Date
        } else if (value === null) {
            return PrimitiveTypes.Null
        } else {
            return PrimitiveTypes.Object
        }
    } else if (type === 'number' && isNaN(value)) {
        return PrimitiveTypes.NaN
    } else {
        return type as PrimitiveTypes
    }
}

/**
 * A function that tells you wether an object is empty or not
 *
 * @param {any} obj is the object you want to check if its empty
 * @returns {boolean} weather the object is empty or not
 */
export function isObjectEmpty (obj: AnyObject): boolean {
    return Object.keys(obj).length === 0
}

/**
 * A function that tells you wether an array is empty or not
 *
 * @param {any} arr is the array you want to check if its empty
 * @returns {boolean} weather the array is empty or not
 */
export function isArrayEmpty (arr: unknown[]): boolean {
    return arr.length === 0
}

/**
 * Merges two objects together, returning a new object that contains all properties from both
 * objects, with properties from obj2 taking precedence over obj1 in case of conflicts. However,
 * only properties from obj2 that do not already exist in obj1 will be included in the result.
 *
 * @param obj1 The first object to merge.
 * @param obj2 The second object to merge.
 *
 * @returns A new object containing all properties from obj1 and obj2, with properties from obj2
 * taking precedence over obj1 in case of conflicts, but only including properties from obj2 that
 * do not already exist in obj1.
 */
export function mergeObjectsOnlyNewProperties (obj1: AnyObject, obj2: AnyObject): any {
    return {
        ...obj1,
        ...Object.fromEntries(Object.entries(obj2).filter(([key]) => !(key in obj1)))
    }
}

/**
 * This object will have all fields and their important data
 */
export const fieldsMetaData: FieldsMetaData = {
    text: {
        staticObject: TextField,
        defaultValue: '',
        getInstantiatedObject: (property: Property, data: Data, params: ParametersInternal) => {
            return new TextField(property, data, params)
        }
    },
    number: {
        staticObject: NumberField,
        defaultValue: 0,
        getInstantiatedObject: (property: Property, data: Data, params: ParametersInternal) => {
            return new NumberField(property, data, params)
        }
    },
    boolean: {
        staticObject: BooleanField,
        defaultValue: true,
        getInstantiatedObject: (property: Property, data: Data, params: ParametersInternal) => {
            return new BooleanField(property, data, params)
        }
    },
    null: {
        staticObject: NullField,
        defaultValue: null,
        getInstantiatedObject: (property: Property, data: Data, params: ParametersInternal) => {
            return new NullField(property, data, params)
        }
    },
    object: {
        staticObject: ObjectContainer,
        defaultValue: {},
        getInstantiatedObject: (property: Property, data: Data, params: ParametersInternal): Field => {
            return new ObjectContainer(property, data, params)
        }
    },
    array: {
        staticObject: ArrayContainer,
        defaultValue: [],
        getInstantiatedObject: (property: Property, data: Data, params: ParametersInternal) => {
            return new ArrayContainer(property, data, params)
        }
    },
    cardSelect: {
        staticObject: CardSelectField,
        defaultValue: '',
        getInstantiatedObject: (property: Property, data: Data, params: ParametersInternal) => {
            return new CardSelectField(property, data, params)
        }
    },
    date: {
        staticObject: DateField,
        defaultValue: new Date(),
        getInstantiatedObject: (property: Property, data: Data, params: ParametersInternal) => {
            return new DateField(property, data, params)
        }
    }
}

/**
 * A function that gets an default value of a fieldType
 */
export function getDefaultValueByFieldType (fieldType: string): Field {
    return lodash.cloneDeep(fieldsMetaData[fieldType].defaultValue)
}

/**
 * A function that gets an instance of the field based on the type
 *
 * @param {Property} property is the object you want to check if its empty
 * @returns {Field} instance of the Field
 */
export function getFieldInstance (property: Property, data: Data, params: ParametersInternal): Field {
    if (property._fieldType !== undefined) {
        return fieldsMetaData[property._fieldType].getInstantiatedObject(property, data, params)
    }
    throw new Error('property._fieldType is undefined')
}

/**
 * A function that draws any google font outline Icon by icon name
 *
 * @param {string} iconName is the the name of the icon you want to draw
 * @returns {HTMLElement} instance of the Field
 */
export function drawOutlineIcon (iconName: string): HTMLElement {
    const deleteIconElement = document.createElement('span')
    deleteIconElement.classList.add('material-icons-outlined')
    deleteIconElement.innerHTML = iconName

    return deleteIconElement
}

/**
 * A function that draws the descriptionSymbol
 *
 * @returns {HTMLElement} instance of the Field
 */
export function drawDescriptionSymbol (): HTMLElement {
    const descriptionSymbol = document.createElement('div')
    descriptionSymbol.classList.add('guifierDescriptionSymbol')
    descriptionSymbol.append('!')

    return descriptionSymbol
}

/**
 * A function that generated the description tool tip
 */
export function drawDescriptionToolTip (field: Field, objectFieldContainer: HTMLElement): void {
    // the tool tip you need to show
    const descriptionTooltip = document.createElement('div')
    descriptionTooltip.classList.add('guifierDescriptionTooltip')
    descriptionTooltip.insertAdjacentHTML('afterbegin', `
        <div class="descriptionHeader">
            <div class="guifierDescriptionSymbol">!</div>
            <div>
                ${field.keyName}
                <span class="descriptionFieldType">(${field.getFieldLabelName()})</span>
            </div>
        </div>
        <div class="descriptionBody">${field.property._params.description as string}</div>
    `)
    objectFieldContainer.append(descriptionTooltip)
    // the refrence of the tool tip
    const descriptionTooltipRefrence = document.createElement('div')
    descriptionTooltipRefrence.classList.add('descriptionTooltipRefrence')
    objectFieldContainer.append(descriptionTooltipRefrence)
    // compute its position
    let timeout: number = 0
    objectFieldContainer.addEventListener('mouseenter', () => {
        clearTimeout(timeout)
        computePosition(descriptionTooltipRefrence, descriptionTooltip, {
            placement: 'top',
            middleware: [offset(15), flip(), shift()]
        }).then(({ x, y }) => {
            Object.assign(descriptionTooltip.style, {
                left: `${x}px`,
                top: `${y}px`
            })
        }).then(() => {}).catch((err) => {
            console.log('ERROR: from positioning')
            console.log(err)
        })
    })
    objectFieldContainer.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            descriptionTooltip.removeAttribute('style')
        }, 250)
    })
}

/**
 * This function will get you the PrimitiveTypes based on the string stringType
 *
 * @param {string} stringType is the stringType that will get the PrimitiveTypes based on
 * @returns {PrimitiveTypes} the primitive type according to the stringType
 */
export function getPrimitiveEnumByStringType (stringType: string): PrimitiveTypes {
    const stringTypeToPrimitiveEnum: Record<string, PrimitiveTypes> = {
        array: PrimitiveTypes.Array,
        object: PrimitiveTypes.Object,
        boolean: PrimitiveTypes.Boolean,
        null: PrimitiveTypes.Null,
        number: PrimitiveTypes.Number,
        string: PrimitiveTypes.String
    }

    return stringTypeToPrimitiveEnum[stringType]
}

/**
 * this function is used by the Data object to assign default field type to a property
 * if the field type wasnt specified by the user
 */
export function getFieldTypeByValuetype (valueType: string): string {
    switch (valueType) {
        case 'string':
            return 'text'
        case 'number':
            return 'number'
        case 'boolean':
            return 'boolean'
        case 'object':
            return 'object'
        case 'array':
            return 'array'
        case 'null':
            return 'null'
        case 'undefined':
            return 'undefined'
        case 'NaN':
            return 'null'
        case 'Date':
            return 'date'
        default:
            throw new Error('value type is not supported')
    }
}
