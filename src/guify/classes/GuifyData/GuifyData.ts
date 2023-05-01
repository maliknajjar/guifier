import type { GuifyProperty } from '../../types'
import { defaultGuifyProperty } from '../../types'
import { GuifyDataType, PrimitiveTypes } from '../../enums'
import { getType } from '../../utils'

/**
 * Represents the guify parsed data
 */
export class GuifyData {
    private data: GuifyProperty = defaultGuifyProperty

    constructor (data: string, dataType: GuifyDataType) {
        // converting the data types into a js object
        this.deserializeData(data, dataType)

        // adding meta data (private properties) to the properties that dont have them
        this.data = GuifyData.addMetaDataRecursively(this.data)

        // calculating rules is the step of checking the global or local rules in a property and then refiling the rules
        // in all object's properties based on the rules specified by the user
        // TODO
    }

    /**
     * This method converts GuifyDataType string into a JS object
     *
     * @param {string} data is the data string
     * @param {GuifyDataType} dataType is the data type
     * @returns {AnyObject} javascript object
     */
    private deserializeData (data: string, datatype: GuifyDataType): void {
        switch (datatype) {
            case GuifyDataType.Json:
                try {
                    this.data = JSON.parse(data)
                } catch (error: any) {
                    throw new Error(error)
                }
                break
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

    /**
     * This method adds meta data (private properties) to the data object and all its
     * nested properties if they dont have it and ignore the ones that have it
     *
     * @param {AnyObject} field is the input you want to add meta data to it and to its properties
     * @returns {AnyObject} the new object filled with meta data
     */
    private static addMetaDataRecursively (field: GuifyProperty): GuifyProperty {
        if (getType(field) === PrimitiveTypes.Object) {
            if (!('_value' in field)) {
                field = GuifyData.addDefaultMetadataToPrimitives(field)
            }

            for (const key in field._value) {
                field._value[key] = GuifyData.addMetaDataRecursively(field._value[key])
            }
        } else if (getType(field) === PrimitiveTypes.Array) {
            field = GuifyData.addDefaultMetadataToPrimitives(field)

            for (const key in field._value) {
                field._value[key] = GuifyData.addMetaDataRecursively(field._value[key])
            }
        } else {
            field = GuifyData.addDefaultMetadataToPrimitives(field)
        }

        return field
    }

    /**
     * This method fills default metadata for types that dont have metadata
     *
     * @param {AnyObject} field is the primitive type that will be filled with default meta data
     * @returns {AnyObject} the new object filled with meta data
     */
    private static addDefaultMetadataToPrimitives (field: GuifyProperty): GuifyProperty {
        return {
            _type: getType(field),
            _value: field
        }
    }

    // TODO: create a generator function that loops through the data object
    // the purpose of this is to make looping through the object easy and
    // using a simpler syntax. its a nesseccasity if you want to loop
    // multiple times in different times
}
