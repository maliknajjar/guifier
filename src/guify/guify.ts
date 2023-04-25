import type { GuifyParameters, AnyObject } from './types/guify'
import { GuifyDataType, PrimitiveTypes } from './enums/guify'
import { getType } from './utils'

/**
 * Guify class handles converting the passed data into an HTML/GUI representation
 *
 * @param {GuifyParameters} params is the object that has all parameters for the Guify class.
 */
export class Guify {
    params: GuifyParameters
    private data: AnyObject = {}

    constructor (params: GuifyParameters) {
        // setting properties
        this.params = params

        // executing methods
        this.parse()

        // logging the results
        console.log('parsed data')
        console.log(this.data)
    }

    /**
     * This method will handle these things:<br>
     * - converting the data types into a js object and validating the conversion
     * - include meta data (private properties) for properties that dont have them
     */
    private parse (): void {
        // converting the data types into a js object
        this.data = Guify.deserializeData(this.params.data, this.params.dataType)
        if ('_errors' in this.data) {
            return
        }

        // adding meta data (private properties) to the properties that dont have them
        this.data = Guify.addMetaDataRecursively(this.data)
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
                } catch (error) {
                    return { _errors: [error] }
                }
            case GuifyDataType.Yaml:
                return { _errors: ['Unsupported datatype'] }
            case GuifyDataType.Xml:
                return { _errors: ['Unsupported datatype'] }
            case GuifyDataType.Toml:
                return { _errors: ['Unsupported datatype'] }
            case GuifyDataType.Csv:
                return { _errors: ['Unsupported datatype'] }
            case GuifyDataType.Edn:
                return { _errors: ['Unsupported datatype'] }
            case GuifyDataType.Cbor:
                return { _errors: ['Unsupported datatype'] }
            case GuifyDataType.Bson:
                return { _errors: ['Unsupported datatype'] }
            default:
                return { _errors: ['Invalid datatype'] }
        }
    }

    /**
     * This method adds meta data (private properties) to the data object and all its nested properties
     *
     * @param {AnyObject} field is the input you want to add meta data to it and to its properties
     * @returns {AnyObject} the new object filled with meta data
     */
    private static addMetaDataRecursively (field: AnyObject): AnyObject {
        if (getType(field) === PrimitiveTypes.Object) {
            if (!('_value' in field)) {
                field = Guify.addDefaultMetadataToPrimitives(field)
            }

            for (const key in field._value) {
                field._value[key] = Guify.addMetaDataRecursively(field._value[key])
            }
        } else if (getType(field) === PrimitiveTypes.Array) {
            field = Guify.addDefaultMetadataToPrimitives(field)

            for (const key in field._value) {
                field._value[key] = Guify.addMetaDataRecursively(field._value[key])
            }
        } else {
            field = Guify.addDefaultMetadataToPrimitives(field)
        }

        return field
    }

    /**
     * This method fills default metadata for primitive types
     *
     * @param {AnyObject} field is the primitive type that will be filled with default meta data
     * @returns {AnyObject} the new object filled with meta data
     */
    private static addDefaultMetadataToPrimitives (field: AnyObject): AnyObject {
        return {
            _type: getType(field),
            _value: field
        }
    }
}
