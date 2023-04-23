/**
 * Represents the object that gets passed to the instantiated Guify object
 *
 * @property {string} elementId is element's id.
 * @property {string} data is the data you want to guify.
 * @property {GuifyDataType} dataType is the type of the passed data.
 */
export interface GuifyParameters {
    elementId: string
    data: string | any
    dataType: GuifyDataType
}
