import type { GuifyProperty } from '../types'
import { defaultGuifyProperty } from '../types'
import { GuifyDataType, PrimitiveTypes } from '../enums'
import { getType } from '../utils'

/**
 * Represents the guify parsed data
 */
export class GuifyData {
    private data: GuifyProperty = defaultGuifyProperty
    readonly path: string[] = []

    constructor (data: string, dataType: GuifyDataType) {
        // converting data types string into a js object
        this.deserializeData(data, dataType)

        // adding meta data (private properties) to the properties that dont have them
        this.data = this.addMetaDataRecursively(this.data, 'root')

        // TODO: calculating rules is the step of checking the global or local rules in a property and then refiling the rules
        // in all object's properties based on the rules specified by the user

        // looping through the GuifyData
        for (const [obj, path] of this.iterateOverProperties()) {
            console.log(path)
            console.log(obj)
        }
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

    // TODO adjust the documentation of the function
    /**
     * This method adds meta data (private properties) to the data object and all its
     * nested properties if they dont have it and ignore the ones that have it
     *
     * @param {AnyObject} field is the input you want to add meta data to it and to its properties
     * @returns {AnyObject} the new object filled with meta data
     */
    private addMetaDataRecursively (field: GuifyProperty, key: string): GuifyProperty {
        // to record the path
        this.path.push(key)

        if (getType(field) === PrimitiveTypes.Object) {
            field = GuifyData.addMetaDataToProperties(field, key, this.path)

            for (const key in field._value) {
                field._value[key] = this.addMetaDataRecursively(field._value[key], key)
            }
        } else if (getType(field) === PrimitiveTypes.Array) {
            field = GuifyData.addMetaDataToProperties(field, key, this.path)

            for (const key in field._value) {
                field._value[key] = this.addMetaDataRecursively(field._value[key], key)
            }
        } else {
            field = GuifyData.addMetaDataToProperties(field, key, this.path)
        }

        // to record the path
        this.path.pop()

        return field
    }

    // TODO adjust the documentation of the function
    /**
     * This method fills default metadata for types that dont have metadata
     *
     * @param {AnyObject} field is the primitive type that will be filled with default meta data
     * @returns {AnyObject} the new object filled with meta data
     */
    private static addMetaDataToProperties (field: GuifyProperty, key: string, path: string[]): GuifyProperty {
        // TODO: check if the field already has private properties or not and fill the missing ones
        // you can even make validation to check if the types of the private properties are right

        // clone the array to prevent pointing to an empty array
        path = Array.from(path)

        return {
            _path: path,
            _key: key,
            _valueType: getType(field),
            _value: field
        }
    }

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
}
