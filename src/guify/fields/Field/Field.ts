import './fieldStyle.css'

import type { Parameters, Property } from '../../types'
import type { Data } from '../../classes/Data'
import type { FieldLocalParamInternal } from './types'

import { fieldLocalParameterSchema } from './types'

export abstract class Field {
    protected data: Data

    /**
     * This is the property of the current field. a property is a part that
     * represents the field in the data object that has all the data
     */
    public property: Property

    /**
     * This is the params of the guify object. here you can find all the configurations of the user
     */
    protected params: Parameters

    /**
     * This is the keyName of the current field. if the field is an object property
     * it will have a string key and if its an array key its going to have a number key
     */
    public keyName: string | number

    /**
     * every field has two colors theme to make them more visible when they are nested
     * this property decides which color theme to use
     */
    public showSecondaryColors: boolean = false

    /**
     * The localParam property is the this.property._params
     */
    public localParam: FieldLocalParamInternal

    /**
     * this property tells if the current field is a big field (if it requires more than 45px height) like object, array or a rich text field
     */
    public isCollapsible = false

    public abstract getFieldLabelName (): string

    constructor (property: Property, data: Data, params: Parameters) {
        this.params = params
        this.property = property
        this.data = data
        this.keyName = property._key

        // setting the _param property
        if (this.property._params === undefined) {
            this.property._params = {}
        }
        this.localParam = fieldLocalParameterSchema.parse(this.property._params)
    }

    /**
     * This function validates the _params of the property object
     */
    protected abstract validateParams (): void

    /**
     * This function validates the _rules of the property object
     */
    protected abstract validateRules (): void

    /**
     * This function is responsible for drawing the HTMLElement object
     *
     * @returns {HTMLElement} html element object
     */
    public abstract draw (): HTMLElement

    /**
     * This function is responsible for setting the new value to the property
     */
    protected setValue (newValue: any): void {
        this.property._value = newValue
    }

    /**
     * This function is responsible for drawing the collapsible fields wihtout a container.
     *  This function needs to be overridden by a child field class and it created to be used
     * with arrays containers
     */
    public drawCollapsibleFieldContentWithoutContainer (): HTMLElement {
        const el = document.createElement('p')
        el.innerHTML = 'drawCollapsibleFieldContentWithoutContainer method is not defined in this field'
        return el
    }
}
