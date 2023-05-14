import clone from 'clone'

import type { GuifyProperty, AnyObject } from '../types'
import { defaultGuifyProperty } from '../types'
import { GuifyDataType, PrimitiveTypes } from '../enums'
import { getType, mergeObjectsOnlyNewProperties } from '../utils'

/**
 * Represents the guify parsed data
 */
export class GuifyData {
    public rawData: any
    public data: GuifyProperty = defaultGuifyProperty
    readonly path: string[] = []

    // this object is used to assign default field type to a property
    // if the field type wasnt specified by the user
    public static valueTypesToFieldTypes = {
        string: 'text',
        number: 'number',
        boolean: 'boolean',
        object: 'object',
        array: 'array',
        null: 'null',
        undefined: 'undefined',
        NaN: 'notNumber'
    }

    constructor (data: string, dataType: GuifyDataType) {
        // converting data types string into a js object
        this.rawData = GuifyData.deserializeData(data, dataType)

        // adding meta data (private properties) to the properties that dont have them
        this.data = this.addMetaDataRecursively(this.rawData, 'root')

        // normalizing _rules array in the property meta data
        this.normalizingRules()

        // looping through the GuifyData example and printing the properties
        // for (const [obj, path] of this.iterateOverProperties()) {
        //     console.log(path)
        //     console.log(obj)
        // }

        // printing the whole object
        console.log('the data object')
        console.log(this.data)
    }

    /**
     * This method converts GuifyDataType string into a JS object
     *
     * @param {string} data is the data string
     * @param {GuifyDataType} dataType is the data type
     * @returns {AnyObject} javascript object
     */
    private static deserializeData (data: string, datatype: GuifyDataType): AnyObject {
        switch (datatype) {
            case GuifyDataType.Json:
                try {
                    return JSON.parse(data)
                } catch (error: any) {
                    throw new Error(error)
                }
            case GuifyDataType.Yaml:
                throw new Error('Unsupported datatype')
            case GuifyDataType.Xml:
                throw new Error('Unsupported datatype')
            case GuifyDataType.Toml:
                throw new Error('Unsupported datatype')
            case GuifyDataType.Csv:
                throw new Error('Unsupported datatype')
            case GuifyDataType.Edn:
                throw new Error('Unsupported datatype')
            case GuifyDataType.Cbor:
                throw new Error('Unsupported datatype')
            case GuifyDataType.Bson:
                throw new Error('Unsupported datatype')
            default:
                throw new Error('Invalid datatype')
        }
    }

    // TODO adjust the documentation of the function
    /**
     * This method adds meta data (private properties) to the data object and all its
     * nested properties if they dont have it and ignore the ones that have it
     *
     * @param {GuifyProperty} field is the input you want to add meta data to it and to its properties
     * @param {string} key the key of that property
     * @returns {GuifyProperty} the new object containing required meta data (includes meta data added by the user)
     */
    private addMetaDataRecursively (field: GuifyProperty, key: string): GuifyProperty {
        // to set the path
        this.path.push(key)

        let fieldType = getType(field)
        if (getType(field) === PrimitiveTypes.Object && '_value' in field) {
            fieldType = getType(field._value)
        }

        if (fieldType === PrimitiveTypes.Object) {
            field = GuifyData.addRequiredMetaDataToProperties(field, key, this.path)

            for (const key in field._value) {
                field._value[key] = this.addMetaDataRecursively(field._value[key], key)
            }
        } else if (fieldType === PrimitiveTypes.Array) {
            field = GuifyData.addRequiredMetaDataToProperties(field, key, this.path)

            for (const key in field._value) {
                field._value[key] = this.addMetaDataRecursively(field._value[key], key)
            }
        } else {
            field = GuifyData.addRequiredMetaDataToProperties(field, key, this.path)
        }

        // to set the path
        this.path.pop()

        return field
    }

    // TODO adjust the documentation of the function
    /**
     * This method fills metadata for properties that dont have metadata.
     * it fills those required metadata based on the property type
     *
     * @example
     * From this:
     * ```js
     * {
     *      name: "malik najjar"
     * }
     * ```
     * To this:
     * ```js
     * {
     *      name: {
                _path: ["root", "name"],
                _key: "name",
                _valueType: "string",
                _value: "malik najjar"
            }
     * }
     * ```
     *
     * @param {GuifyProperty} field is the primitive type that will be filled with default meta data
     * @param {string} key is the key of the property
     * @param {string[]} path is an array that represents the path of the property
     * @returns {AnyObject} the new object filled with meta data
     */
    private static addRequiredMetaDataToProperties (field: GuifyProperty, key: string, path: string[]): GuifyProperty {
        // clone the array to prevent pointing to an empty array
        path = Array.from(path)

        // field with metadata object that will be returned
        let returnedObject = clone(defaultGuifyProperty)
        returnedObject._path = path
        returnedObject._key = key

        // checking if the field has meta data or not
        const fieldHasMetaData: boolean = getType(field) === PrimitiveTypes.Object && '_value' in field
        if (fieldHasMetaData) {
            returnedObject._value = field._value
            returnedObject._valueType = getType(field._value)
            // keeping any additional properties added by the user
            returnedObject = mergeObjectsOnlyNewProperties(returnedObject, field)
        } else {
            returnedObject._value = field
            returnedObject._valueType = getType(field)
        }

        // assigning the the field type based on the value type
        returnedObject._fieldType = this.valueTypesToFieldTypes[returnedObject._valueType]

        return returnedObject
    }

    /**
     * This method gives the ability to iterate over parsed data object easily
     * with a simple for loop syntax
     *
     * @example
     * ```ts
     * const data = new GuifyData('{"name": "malik"}', 'json')
     * for (const [obj, path] of data.iterateOverProperties()) {
     *      console.log(path)
     *      console.log(obj)
     * }
     * ```
     */
    public * iterateOverProperties (property?: GuifyProperty): Generator<[GuifyProperty, string[]]> {
        if (property == null) {
            property = this.data
        }

        if (property._valueType === PrimitiveTypes.Object) {
            yield [property, property._path]
            const value = property._value
            for (const key in value) {
                yield * this.iterateOverProperties(value[key])
            }
        } else if (property._valueType === PrimitiveTypes.Array) {
            yield [property, property._path]
            const value = property._value
            for (const key in value) {
                yield * this.iterateOverProperties(value[key])
            }
        } else {
            yield [property, property._path]
        }
    }

    /**
     * This method normalizes the _rule private parameter of a property
     * @example
     * Converts this:
     * ```js
     * {
     *      _rules: ["READ_ONLY", "DELETE_DISABLED"]
     * }
     * ```
     * To this:
     * ```js
     * {
     *      _rules: [
     *          {
     *              rule: "READ_ONLY",
     *              params: null
     *          },
     *          {
     *              rule: "DELETE_DISABLED",
     *              params: null
     *          }
     *      ]
     * }
     * ```
     */
    private normalizingRules (): void {
        for (const [obj] of this.iterateOverProperties()) {
            if (obj._rules !== undefined) {
                for (let index = 0; index < obj._rules.length; index++) {
                    if (getType(obj._rules[index]) === PrimitiveTypes.String) {
                        obj._rules[index] = {
                            rule: obj._rules[index],
                            param: null
                        }
                    }
                }
            }
        }
    }
}
