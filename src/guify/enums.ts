/**
* Represents type of the data passed to the instantiated Guify object
*/
export enum GuifyDataType {
    Json = 'json',
    Yaml = 'yaml',
    Xml = 'xml',
    Toml = 'toml',
    Csv = 'csv',
    Edn = 'edn',
    Cbor = 'cbor',
    Bson = 'bson',
}

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
