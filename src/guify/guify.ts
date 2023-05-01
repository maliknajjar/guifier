import * as z from 'zod'

import type { GuifyParameters, AnyObject, GuifyErrors } from './types/guify'
import { GuifyDataType, PrimitiveTypes } from './enums/guify'
import { GuifyParameterSchema } from './schemas/guify'
import { getType, isArrayEmpty } from './utils'

/**
 * Guify class handles converting the passed data into an HTML/GUI representation
 *
 * @param {GuifyParameters} params is the object that has all parameters for the Guify class.
 */
export class Guify {
    readonly params: GuifyParameters
    private data: AnyObject = {}

    // global errors that prevent the whole application from running are stores here
    readonly errors: GuifyErrors[] = []

    constructor (params: GuifyParameters) {
        // setting properties
        this.params = params

        // validating params
        this.validateParams()

        // parsing phase
        this.parse()

        // calculating rules is the step of checking the global or local rules in a property and then refiling the rules
        // in all object's properties based on the rules specified by the user
        // TODO

        // drawing part
        // TODO

        // logging the results
        console.log('errors: ')
        console.log(this.errors)
        console.log('the data is: ')
        console.log(this.data)
    }

    /**
     * This method will validate the params objects passed to the Guify instantiated object:<br>
     */
    private validateParams (): void {
        try {
            GuifyParameterSchema.parse(this.params)
        } catch (error) {
            // adding validation params validation errors to the Guify global errors
            if (error instanceof z.ZodError) {
                error.errors.forEach((error) => {
                    this.errors.push({
                        code: error.code,
                        message: `${error.path.join('.')} is ${error.message}`
                    })
                })
            }
        }
    }

    /**
     * This method will handle these things:<br>
     * - converting the data types into a js object and validating the conversion
     * - include meta data (private properties) for properties that dont have them
     */
    private parse (): void {
        // skippting this step if there are any errors
        if (this.thereAreErrors()) return

        // converting the data types into a js object
        this.data = this.deserializeData(this.params.data, this.params.dataType)
        if (this.thereAreErrors()) return

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
    private deserializeData (data: string, datatype: GuifyDataType): AnyObject {
        switch (datatype) {
            case GuifyDataType.Json:
                try {
                    return JSON.parse(data)
                } catch (error: any) {
                    this.errors.push({
                        code: 'json_parser_error',
                        message: error
                    })
                }
                return {}
            case GuifyDataType.Yaml:
                this.errors.push({
                    code: 'yaml_parser_error',
                    message: 'Unsupported datatype'
                })
                return {}
            case GuifyDataType.Xml:
                this.errors.push({
                    code: 'xml_parser_error',
                    message: 'Unsupported datatype'
                })
                return {}
            case GuifyDataType.Toml:
                this.errors.push({
                    code: 'toml_parser_error',
                    message: 'Unsupported datatype'
                })
                return {}
            case GuifyDataType.Csv:
                this.errors.push({
                    code: 'csv_parser_error',
                    message: 'Unsupported datatype'
                })
                return {}
            case GuifyDataType.Edn:
                this.errors.push({
                    code: 'edn_parser_error',
                    message: 'Unsupported datatype'
                })
                return {}
            case GuifyDataType.Cbor:
                this.errors.push({
                    code: 'cbor_parser_error',
                    message: 'Unsupported datatype'
                })
                return {}
            case GuifyDataType.Bson:
                this.errors.push({
                    code: 'bson_parser_error',
                    message: 'Unsupported datatype'
                })
                return {}
            default:
                this.errors.push({
                    code: 'default_parser_error',
                    message: 'Invalid datatype'
                })
                return {}
        }
    }

    /**
     * This method adds meta data (private properties) to the data object and all its
     * nested properties if they dont have it and ignore the ones that have it
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
     * This method fills default metadata for types that dont have metadata
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

    /**
     * This method will handle validation of the data object<br>
     *
     * @returns {boolean} weather there are errors or not
     */
    private thereAreErrors (): boolean {
        if (!isArrayEmpty(this.errors)) return true
        else return false
    }

    // TODO: create a generator function that loops through the data object
    // the purpose of this is to make looping through the object easy and
    // using a simpler syntax. its a nesseccasity if you want to loop
    // multiple times in different times
}
