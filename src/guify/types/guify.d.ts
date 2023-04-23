enum GuifyDataType {
    JsObject,
    Json,
    Yaml,
    Xml,
    Toml,
    csv,
    Edn,
    Cbor,
    Bson,
}

/**
 * Represents the object that gets passed to the instantiated Guify object
 * 
 * @property {string} element_id is element's id.
 * @property {string} data is the data you want to guify.
 * @property {GuifyDataType} dataType is the type of the passed data.
 */
export interface GuifyParameters {
    elementId: string;
    data: string | any;
    dataType: GuifyDataType;
}