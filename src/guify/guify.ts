import { initEvenListeners } from "./guifyEventListeners";

// global variables
const guifyArrowDownSvg = '<svg class="guifySvg guifyDropDownButton" xmlns="http://www.w3.org/2000/svg" style="fill: var(--black-color)" viewBox="0 0 47 47" height="25" width="25"><path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"/></svg>';
const guifyAddButton = '<svg class="guifySvg guifyAddButton" xmlns="http://www.w3.org/2000/svg" style="fill: var(--black-color)" viewBox="0 0 47 47" height="25" width="25"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>';
const guifyRemoveButton = '<svg class="guifyDeleteButton guifySvg guifyRemoveButton" data-for="container" viewBox="0 0 47 47" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg>';
const guifyRemoveButtonForInputs = '<svg class="guifyDeleteButton guifySvg guifyRemoveButtonForInputs" data-for="objectElement" viewBox="0 0 47 47" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg>';
const guifyRemoveButtonForArrayElement = '<svg class="guifyDeleteButton guifySvg guifyRemoveButtonForArrayElement" data-for="arrayElement" viewBox="0 0 47 47" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg>';

export class Guify {
    deepLevel = 0;
    // this array helps us determine the path of every array's element or object's property
    inputPath = [];

    constructor() {
        // initializing the event listeners
        initEvenListeners();
    }

    /**
     * This function turns a json object into an html gui
     * @param  {object} json json object you want to turn into an html string
     * @return {String} html string
     */
    convertJsonToGui(json) {
        const jsonType = typeof json == "object" && Array.isArray(json) ? "array" : "object";
        return `<div class="guifyMainContainer">
            ${this.getContainerHtmlByType(jsonType, "GUI VIEWER", json, "var(--lighter-main-color)")}
        </div>`;
    }

    /**
     * Draws the the html described in the obj variable recursivley
     * @param  {object} obj object desribes elements to draw
     * @return {String} html string
     */
    recursiveDrawer(obj, isArrayElement) {
        this.deepLevel++;
        // creating the virtual dom that will get manipulated
        const mainElement = document.createElement('div');
        mainElement.classList.add("guifyBody");
        mainElement.classList.add("guifyContainer");
        if (obj && typeof obj == "object" && !Array.isArray(obj)) {
            mainElement.setAttribute("data-length", Object.keys(obj).length);
            if (Object.keys(obj).length == 0) {
                mainElement.insertAdjacentHTML("beforeend", Guify.emptyObjectContainerInnerHtml());
            }
        } else if (typeof obj == "object" && Array.isArray(obj)) {
            mainElement.classList.add("guifyRemoveTopPadding");
        }
        if (isArrayElement) {
            mainElement.classList.add("guiRemoveSideBorder");
            mainElement.classList.add("guiArrayContainer");
        }

        // building the html
        // toggle colorToggle variable and assigning color variables
        // this is the responsible of changing colors every level to
        // increase the contrast and make it clearer
        const mainColor =  Guify.isOdd(this.deepLevel) ? "var(--lighter-main-color)" : "var(--second-color)";
        const secondColor = !Guify.isOdd(this.deepLevel) ? "var(--lighter-main-color)" : "var(--second-color)";
        // setting the bg color of the container
        mainElement.style.backgroundColor = mainColor;
        obj = typeof obj == "object" && !Array.isArray(obj) ? obj : {"_null": obj};
        const keys = Object.keys(obj);
        for (let index = 0; index < keys.length; index++) {
            const value = obj[keys[index]];
            const key = keys[index] == "_null" ? null : keys[index];
            if (key) {
                this.inputPath.push(key);
            }
            console.log('inputPath: ', this.inputPath);
            if (value === null) {
                mainElement.insertAdjacentHTML("beforeend", Guify.getHtmlByElementType("null", key, value, secondColor, this.inputPath.join(".")));
            } else if (typeof value == "undefined") {
                mainElement.insertAdjacentHTML("beforeend", Guify.getHtmlByElementType("undefined", key, value, secondColor, this.inputPath.join(".")));
            } else if (typeof value == "object" && !Array.isArray(value)) {
                mainElement.insertAdjacentHTML("beforeend", this.getContainerHtmlByType("object", key, value, secondColor, this.inputPath.join(".")));
            } else if (typeof value == "object" && Array.isArray(value)) {
                mainElement.insertAdjacentHTML("beforeend", this.getContainerHtmlByType("array", key, value, secondColor, this.inputPath.join(".")));
            } else if (typeof value == "string") {
                mainElement.insertAdjacentHTML("beforeend", Guify.getHtmlByElementType("string", key, value, secondColor, this.inputPath.join(".")));
            } else if (typeof value == "number") {
                mainElement.insertAdjacentHTML("beforeend", Guify.getHtmlByElementType("number", key, value, secondColor, this.inputPath.join(".")));
            } else if (typeof value == "boolean") {
                mainElement.insertAdjacentHTML("beforeend", Guify.getHtmlByElementType("boolean", key, value, secondColor, this.inputPath.join(".")));
            }
            if (key) {
                this.inputPath.pop();
            }
        }

        this.deepLevel--;
        return mainElement.outerHTML;
    }

    /**
     * returns the html input based on the passed property type
     */
    static getHtmlByElementType(type, key, value, color, inputPath) {
        switch(type) {
            case "string":
                return (`<div class="guifyProperty" data-path="${inputPath}">
                    <div class="guifyPropertyKey">
                        ${key ? `<span>${key}</span>` : ""}
                        ${key ? guifyRemoveButtonForInputs : ""}
                    </div>
                    <input class="guifyPropertyInput" type="text" placeholder="${type} value" value="${value}" style="background-color: ${color};">
                </div>`)
            case "number":
                return (`<div class="guifyProperty" data-path="${inputPath}">
                    <div class="guifyPropertyKey">
                        ${key ? `<span>${key}</span>` : ""}
                        ${key ? guifyRemoveButtonForInputs : ""}
                    </div>
                    <input class="guifyPropertyInput" type="number" placeholder="${type} value" value="${value}" style="background-color: ${color};">
                </div>`)
            case "boolean":
                return (`<div class="guifyProperty" data-path="${inputPath}">
                    <div class="guifyPropertyKey">
                        ${key ? `<span>${key}</span>` : ""}
                        ${key ? guifyRemoveButtonForInputs : ""}
                    </div>
                    <div class="guifyCheckBox" style="background-color: ${color};">
                        <div class="guifyTrue ${value ? "guifySelectTrue" : ""}">True</div>
                        <div class="guifyFalse ${value ? "" : "guifySelectFalse"}">False</div>
                    </div>
                </div>`)
            case "null":
                return (`<div class="guifyProperty" data-path="${inputPath}">
                    <div class="guifyPropertyKey">
                        ${key ? `<span>${key}</span>` : ""}
                        ${key ? guifyRemoveButtonForInputs : ""}
                    </div>
                    <div class="guifyNull">
                        <div>null</div>
                    </div>
                </div>`)
            case "undefined":
                return (`<div class="guifyProperty" data-path="${inputPath}">
                    <div class="guifyPropertyKey">
                        ${key ? `<span>${key}</span>` : ""}
                        ${key ? guifyRemoveButtonForInputs : ""}
                    </div>
                    <div class="guifyNull">
                        <div>undefined</div>
                    </div>
                </div>`)
        }
    }
    /**
     * returns the html input based on the passed property type for array's element
     */
    static getArrayELementContainerHtml(element, type, index, color) {
        return `<div class="guifyArrayElement guifyAddSideBorder ">
            <div style="display:flex; column-gap: 7.5px; align-items: center;">
                <div class="guifyIndex">${index}</div>
                <div class="guifyValue">${type}</div>
            </div>
            <div class="guifyHeaderLeftPart">
                ${guifyRemoveButtonForArrayElement}
                ${guifyArrowDownSvg}
            </div>
        </div>
        <div class="guifyValueBody guifyObjectProperty guifyObjectProperty GuiHiddenElement ">
            <div class="guifyBody ${type == 'array' ? "guifyRemoveTopPadding" : ""} guifyContainer guiRemoveSideBorder guiArrayContainer" style="background-color: ${color};">
                ${element}
            </div>                  
        </div>`
    }
    /**
     * returns empty object or array container
     */
    static emptyObjectContainerInnerHtml = () => {
        return `<div class="guiEmptyContainer">
            <div class="title">No property is created yet</div>
            <div class="description">Click on the add button to create a new property</div>
        </div>`
    }
    static emptyArrayContainerInnerHtml = () => {
        return `<div class="guifyArrayElement guifyAddSideBorder guifyRemoveBotomBorder guiEmptyContainer">
            <div class="guiEmptyContainer">
                <div class="title">No element is created yet</div>
                <div class="description">Click on the add button to create a new element</div>
            </div>
        </div>`
    }
    static getEmptyHtmlcontainer(type, key, color) {
        switch(type) {
            case "object":
                return (`<div class="guifyObjectProperty" style="background-color: ${color}">
                    ${key ? `<div class="guifyHeader">
                        <input class="guifyPropertyKey" value="${key}">
                        <div class="guifyHeaderLeftPart">${guifyRemoveButton}</div>
                    </div>` : ''}
                    <div class="guifyBody guifyContainer ${key ? '' : 'guifyRemoveBorder guifyRemovePadding'}" data-length="0" style="background-color: ${color}">
                        ${Guify.emptyObjectContainerInnerHtml()}
                    </div>
                    <div class="addPropertyButtonContainer ${key ? '' : 'guifyRemoveBorder guifyRemovePadding guifyAddTopPadding'}" style="background-color: ${color}">
                        <div class="addPropertyButton">
                            <div class="guifyAddPropertyInObject guifyAddButton">
                                add a property
                                <svg class="guifySvg guifyAddButton" xmlns="http://www.w3.org/2000/svg" style="fill: var(--black-color)" viewBox="0 0 47 47" height="25" width="25"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"></path></svg>
                            </div>
                            ${Guify.getElementsToAdd()}
                        </div>
                    </div>
                </div>`)
            case "array":
                return (`<div class="guifyObjectProperty" style="background-color: ${color}">
                    ${key ? `<div class="guifyHeader">
                        <input class="guifyPropertyKey" value="${key}">
                        <div class="guifyHeaderLeftPart">${guifyRemoveButton}</div>
                    </div>` : ''}
                    <div class="guifyBody guiArrayContainer guifyRemoveSideBorder" style="background-color: ${color}" data-length="0">
                        ${Guify.emptyArrayContainerInnerHtml()}
                    </div>
                    <div class="addElementButtonContainer">
                        <div class="guifyAddButton guifyRemoveBotomBorder guifyAddPropertyInArray">
                            Add an Element
                            <svg class="guifySvg guifyAddButton" xmlns="http://www.w3.org/2000/svg" style="fill: var(--black-color)" viewBox="0 0 47 47" height="25" width="25"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"></path></svg>
                        </div>
                        ${Guify.getElementsToAdd()}
                    </div>
                </div>`)
        }
    }
    /**
     * returns the html input based on the passed property type (for arrays and objects)
     */
    getContainerHtmlByType(type, key, value, color, inputPath) {
        switch(type) {
            case "object":
                return (`<div class="guifyObjectProperty" data-path="${inputPath}" style="background-color: ${color};">
                    ${key ? `<div class="guifyHeader">
                        <input class="guifyPropertyKey" value="${key}">
                        <div class="guifyHeaderLeftPart">${this.deepLevel >= 1 ? guifyRemoveButton : ""}</div>
                    </div>` : ""}
                    ${this.recursiveDrawer(value)}
                    <div class="addPropertyButtonContainer" style="background-color: ${color};">
                        <div class="addPropertyButton">
                            <div class="guifyAddPropertyInObject guifyAddButton">
                                add a property
                                ${guifyAddButton}
                            </div>
                            ${Guify.getElementsToAdd()}
                        </div>
                    </div>
                </div>`)
            case "array":
                return (`<div class="guifyObjectProperty" data-path="${inputPath}" style="background-color: ${color};">
                    ${key ? `<div class="guifyHeader">
                        <input class="guifyPropertyKey" value="${key}">
                        <div class="guifyHeaderLeftPart">${this.deepLevel >= 1 ? guifyRemoveButton : ""}</div>
                    </div>` : ""}
                    <div class="guifyBody guiArrayContainer guifyRemoveSideBorder" style="background-color: ${color};" data-length="${value.length}">
                        ${value.length ? value.map((localValue, index) => {
                            this.inputPath.push(index);
                            const returnedValue = `<div class="guifyArrayElement guifyAddSideBorder 
                                                ${!key ? index == 0 ? "guifyFirstElementStyle" : "": ""} ${index == value.length - 1 ? "guifyRemoveBotomBorder last" : "" }">
                                <div style="display:flex; column-gap: 7.5px; align-items: center;">
                                    <div class="guifyIndex">${index + 1}</div>
                                    <div class="guifyValue">${Array.isArray(localValue) ? "array" : typeof localValue}</div>
                                </div>
                                <div class="guifyHeaderLeftPart">
                                    ${guifyRemoveButtonForArrayElement}
                                    ${guifyArrowDownSvg}
                                </div>
                            </div>
                            <div class="guifyValueBody guifyObjectProperty guifyObjectProperty GuiHiddenElement ${index == value.length - 1 ? "guifyRemoveBotomBorder" : "" }">
                                ${this.recursiveDrawer(localValue, typeof localValue == "object" && !Array.isArray(localValue) ? false : true)}
                                ${typeof localValue == "object" && !Array.isArray(localValue) ? `<div class="addPropertyButtonContainer guifyRemoveBotomBorder guifyremoveBorderRadius" style="background-color: ${color};">
                                    <div class="addPropertyButton">
                                        <div class="guifyAddPropertyInObject guifyAddButton">
                                            add a property
                                            ${guifyAddButton}
                                        </div>
                                        ${Guify.getElementsToAdd()}
                                    </div>
                                </div>` : ``}
                            </div>`;
                            this.inputPath.pop();
                            return returnedValue;
                        }).join("") : `
                            ${Guify.emptyArrayContainerInnerHtml()}
                        `}
                    </div>
                    <div class="addElementButtonContainer">
                        <div class="guifyRemoveBotomBorder guifyAddPropertyInArray guifyAddButton">
                            Add an Element
                            ${guifyAddButton}
                        </div>
                        ${Guify.getElementsToAdd()}
                    </div>
                </div>`)
        }
    }

    /**
     * Decides the elements you can add in an object or array element
     * @param  {object} elementsToAdd object desribes elements to add
     * @return {String} guifyAddElementWidget html string
     */
    static getElementsToAdd(elementsToAdd) {
        return `
            <div class="guifyAddElementWidget GuiHiddenElement">
                <div class="guifyAddElement" data-type="number">
                    ${guifyAddButton}
                    Number
                </div>
                <div class="guifyAddElement" data-type="string">
                    ${guifyAddButton}
                    String
                </div>
                <div class="guifyAddElement" data-type="boolean">
                    ${guifyAddButton}
                    Boolean
                </div>
                <div class="guifyAddElement" data-type="array">
                    ${guifyAddButton}
                    Array
                </div>
                <div class="guifyAddElement" data-type="object">
                    ${guifyAddButton}
                    Object
                </div>
            </div>
        `;
    }

    /**
     * This function tells us if the passed number is odd or not
     * @param  {number} num the number we want to know if its odd or not
     * @return {boolean} is odd boolean
     */
    static isOdd(num) {
        return num % 2;
    }
}