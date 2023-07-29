import * as z from 'zod'

/**
* Represents type of the data passed to the instantiated Guifier object
*/
export const DataTypeSchema = z.enum(['js', 'json', 'yaml', 'xml', 'toml'])
export type DataType = z.input<typeof DataTypeSchema>

/**
* Represents JS primitive types
*/
export enum PrimitiveTypes {
    String = 'string',
    Number = 'number',
    Boolean = 'boolean',
    Object = 'object',
    Array = 'array',
    Null = 'null',
    Undefined = 'undefined',
    NaN = 'NaN',
}
