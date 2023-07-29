/**
* Represents type of the data passed to the instantiated Guifier object
*/
export enum DataType {
    Js = 'js',
    Json = 'json',
    Yaml = 'yaml',
    Xml = 'xml',
    Toml = 'toml'
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
