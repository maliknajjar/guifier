import clone from 'clone'

import type { Property, Parameters } from '../types'

import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import * as toml from 'toml'
import { stringify as tomlStringify } from 'toml-patch'
import { defaultProperty } from '../types'
import { DataType, PrimitiveTypes } from '../enums'
import { getFieldTypeByValuetype, getType, mergeObjectsOnlyNewProperties } from '../utils'
import * as yaml from 'js-yaml'
import unset from 'lodash/unset'
import compact from 'lodash/compact'
import get from 'lodash/get'
import set from 'lodash/set'
import last from 'lodash/last'

/**
 * Represents the guifier parsed data
 */
export class Data {
    public rawData: any
    public parsedData: Property = defaultProperty
    public params: Parameters
    private readonly path: Array<number | string> = []

    constructor (data: string, dataType: DataType, params: Parameters) {
        // add guifier params
        this.params = params

        // converting data types string into a js object
        this.rawData = Data.deserializeData(data, dataType)

        // adding meta data (private properties) to the properties that dont have them
        this.parsedData = this.addMetaDataRecursively(this.rawData, 'root')

        // normalizing _rules array in the property meta data
        this.normalizingRules()
    }

    /**
     * This method returns the data
     */
    public getData (dataType: DataType): any {
        const exportedData: any = {}
        for (const [obj, path] of this.iterateOverProperties()) {
            // skipping the root element
            if (path.length === 1) {
                continue
            }
            const objectPath = Data.convertPathArrayToStringPathFormat(path, false)
            set(exportedData, objectPath, clone(obj._value))
        }

        return Data.serializeData(exportedData, dataType)
    }

    /**
     * This method converts DataType string into a JS object
     *
     * @param {string | any} data is the data string
     * @param {DataType} dataType is the data type
     * @returns {AnyObject} javascript object
     */
    private static deserializeData (data: string | any, datatype: DataType): any {
        switch (datatype) {
            case DataType.Js:
                return data
            case DataType.Json:
                try {
                    return JSON.parse(data)
                } catch (error: any) {
                    throw new Error(error)
                }
            case DataType.Yaml:
                try {
                    return yaml.load(data) as any
                } catch (error: any) {
                    throw new Error(error)
                }
            case DataType.Xml:
                try {
                    return (new XMLParser()).parse(data)
                } catch (error: any) {
                    throw new Error(error)
                }
            case DataType.Toml:
                try {
                    return toml.parse(data)
                } catch (error: any) {
                    throw new Error(error)
                }
            default:
                throw new Error('Invalid datatype')
        }
    }

    /**
     * This method converts JS object into a DataType string
     *
     * @param {string} data is the data JS object
     * @param {DataType} dataType is the data type
     * @returns {AnyObject} is data string
     */
    private static serializeData (data: any, datatype: DataType): string | any {
        switch (datatype) {
            case DataType.Js:
                return data
            case DataType.Json:
                try {
                    return JSON.stringify(data)
                } catch (error: any) {
                    throw new Error(error)
                }
            case DataType.Yaml:
                try {
                    return yaml.dump(data)
                } catch (error: any) {
                    throw new Error(error)
                }
            case DataType.Xml:
                try {
                    return (new XMLBuilder()).build(data)
                } catch (error: any) {
                    throw new Error(error)
                }
            case DataType.Toml:
                try {
                    return tomlStringify(data)
                } catch (error: any) {
                    throw new Error(error)
                }
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
    private addMetaDataRecursively (field: Property, key: string, inArray: boolean = false): Property {
        // to set the path
        const updatedKey = inArray ? parseInt(key) : key
        this.path.push(updatedKey)

        let fieldType = getType(field)
        if (getType(field) === PrimitiveTypes.Object && '_value' in field) {
            fieldType = getType(field._value)
        }

        if (fieldType === PrimitiveTypes.Object) {
            field = Data.addRequiredMetaDataToProperties(field, updatedKey, this.path)

            for (const key in field._value) {
                field._value[key] = this.addMetaDataRecursively(field._value[key], key)
            }
        } else if (fieldType === PrimitiveTypes.Array) {
            field = Data.addRequiredMetaDataToProperties(field, updatedKey, this.path)

            for (const key in field._value) {
                field._value[key] = this.addMetaDataRecursively(field._value[key], key, true)
            }
        } else {
            field = Data.addRequiredMetaDataToProperties(field, updatedKey, this.path)
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
    private static addRequiredMetaDataToProperties (field: Property, key: string | number, path: Array<number | string>): Property {
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
        if (field._fieldType === undefined) {
            returnedObject._fieldType = getFieldTypeByValuetype(returnedObject._valueType)
        } else {
            returnedObject._fieldType = field._fieldType
        }

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
    public * iterateOverProperties (property?: Property): Generator<[Property, Array<number | string>]> {
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

    /**
     * This method adds an array element or an object property.
     */
    public addProperty (propertyPath: Array<number | string>, key: string | number, value: Property): void {
        const propertyStringPath = Data.convertPathArrayToStringPathFormat(propertyPath)
        const path = propertyStringPath + `.${key}`
        console.log(value)
        set(this.parsedData, path, value)
    }

    /**
     * This method removes an array element or an object property.
     */
    public removeData (propertyPath: Array<number | string>): void {
        const propertyStringPath = Data.convertPathArrayToStringPathFormat(propertyPath)
        unset(this.parsedData, propertyStringPath)
        const lastElement = last(propertyPath)
        // if its an array
        if (getType(lastElement) === PrimitiveTypes.Number) {
            propertyPath.pop()
            const _valueString = propertyPath.length === 1 ? '' : '._value'
            const parentPath = Data.convertPathArrayToStringPathFormat(propertyPath) + _valueString
            const arrayToReset = get(this.parsedData, parentPath)
            const resettedArray = Data.resetArrayIndexes(arrayToReset)
            // reset all the propert._path property _key and _path to be accordance with their current index
            for (let index = 0; index < resettedArray.length; index++) {
                resettedArray[index]._key = index
                const pathLength = resettedArray[index]._path.length
                resettedArray[index]._path[pathLength - 1] = index
            }
            set(this.parsedData, parentPath, resettedArray)
        }
    }

    /**
     * This method converts this._path array into a js string path thats usable with lodash
     * @param {boolean} forParsedData is boolean that will make the function generate a path for data that has meta data in it
     */
    private static convertPathArrayToStringPathFormat (propertyPath: Array<number | string>, forParsedData = true): string {
        let returnedString: string = ''
        for (let index = 0; index < propertyPath.length; index++) {
            const element = propertyPath[index]
            if (getType(element) === PrimitiveTypes.String) {
                if (index === 0) {
                    returnedString += `${element}${forParsedData ? '._value' : ''}`
                } else if (index === propertyPath.length - 1) {
                    returnedString += `.${element}`
                } else {
                    returnedString += `.${element}${forParsedData ? '._value' : ''}`
                }
            } else if (getType(element) === PrimitiveTypes.Number) {
                if (index === propertyPath.length - 1) {
                    returnedString += `[${element}]`
                } else {
                    returnedString += `[${element}]${forParsedData ? '._value' : ''}`
                }
            }
        }

        // removing the first ".root" from the path
        return returnedString.substring(5)
    }

    /**
     * This method resets the indexes of the array when there is an empty element in an array
     */
    private static resetArrayIndexes (array: any[]): any[] {
        const newArray = compact(array)
        return newArray
    }
}
