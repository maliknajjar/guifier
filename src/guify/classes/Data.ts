import clone from 'clone'

import type { Property, AnyObject } from '../types'
import { defaultProperty } from '../types'
import { DataType, PrimitiveTypes } from '../enums'
import { getType, mergeObjectsOnlyNewProperties } from '../utils'

/**
 * Represents the guify parsed data
 */
export class Data {
    public rawData: any
    public parsedData: Property = defaultProperty
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

    constructor (data: string, dataType: DataType) {
        // converting data types string into a js object
        this.rawData = Data.deserializeData(data, dataType)

        // adding meta data (private properties) to the properties that dont have them
        this.parsedData = this.addMetaDataRecursively(this.rawData, 'root')

        // normalizing _rules array in the property meta data
        this.normalizingRules()
    }

    /**
     * This method converts DataType string into a JS object
     *
     * @param {string} data is the data string
     * @param {DataType} dataType is the data type
     * @returns {AnyObject} javascript object
     */
    private static deserializeData (data: string, datatype: DataType): AnyObject {
        switch (datatype) {
            case DataType.Json:
                try {
                    return JSON.parse(data)
                } catch (error: any) {
                    throw new Error(error)
                }
            case DataType.Yaml:
                throw new Error('Unsupported datatype')
            case DataType.Xml:
                throw new Error('Unsupported datatype')
            case DataType.Toml:
                throw new Error('Unsupported datatype')
            case DataType.Csv:
                throw new Error('Unsupported datatype')
            case DataType.Edn:
                throw new Error('Unsupported datatype')
            case DataType.Cbor:
                throw new Error('Unsupported datatype')
            case DataType.Bson:
                throw new Error('Unsupported datatype')
            default:
                throw new Error('Invalid datatype')
        }
    }

    /**
     * This method adds meta data (private properties) to the data object and all its
     * nested properties if they dont have it and ignore the ones that have it
     *
     * @param {Property} field is the input you want to add meta data to it and to its properties
     * @param {string} key the key of that property
     * @returns {Property} the new object containing required meta data (includes meta data added by the user)
     */
    private addMetaDataRecursively (field: Property, key: string): Property {
        // to set the path
        this.path.push(key)

        let fieldType = getType(field)
        if (getType(field) === PrimitiveTypes.Object && '_value' in field) {
            fieldType = getType(field._value)
        }

        if (fieldType === PrimitiveTypes.Object) {
            field = Data.addRequiredMetaDataToProperties(field, key, this.path)

            for (const key in field._value) {
                field._value[key] = this.addMetaDataRecursively(field._value[key], key)
            }
        } else if (fieldType === PrimitiveTypes.Array) {
            field = Data.addRequiredMetaDataToProperties(field, key, this.path)

            for (const key in field._value) {
                field._value[key] = this.addMetaDataRecursively(field._value[key], key)
            }
        } else {
            field = Data.addRequiredMetaDataToProperties(field, key, this.path)
        }

        // to set the path
        this.path.pop()

        return field
    }

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
     * @param {Property} field is the primitive type that will be filled with default meta data
     * @param {string} key is the key of the property
     * @param {string[]} path is an array that represents the path of the property
     * @returns {AnyObject} the new object filled with meta data
     */
    private static addRequiredMetaDataToProperties (field: Property, key: string, path: string[]): Property {
        // clone the array to prevent pointing to an empty array
        path = Array.from(path)

        // field with metadata object that will be returned
        let returnedObject = clone(defaultProperty)
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

        // assigning the field type based on the value type
        returnedObject._fieldType = this.valueTypesToFieldTypes[returnedObject._valueType]

        return returnedObject
    }

    /**
     * This method gives the ability to iterate over parsed data object easily
     * with a simple for loop syntax
     *
     * @example
     * ```ts
     * const data = new Data('{"name": "malik"}', 'json')
     * for (const [obj, path] of data.iterateOverProperties()) {
     *      console.log(path)
     *      console.log(obj)
     * }
     * ```
     */
    public * iterateOverProperties (property?: Property): Generator<[Property, string[]]> {
        if (property == null) {
            property = this.parsedData
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
                            params: undefined
                        }
                    }
                }
            }
        }
    }
}
