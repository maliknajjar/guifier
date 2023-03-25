import { Guify } from "./guify";

///////////////////////////////////////////////////////////////////////////
// this code enables me to execute a piece of code when a change happens //
///////////////////////////////////////////////////////////////////////////
var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  
    return function( obj, callback ){
        if( !obj || obj.nodeType !== 1 ) return; 
    
        if( MutationObserver ){
            // define a new observer
            var mutationObserver = new MutationObserver(callback)
    
            // have the observer observe for changes in children
            mutationObserver.observe( obj, { childList:true, subtree:true })
            return mutationObserver
        }
        
        // browser support fallback
        else if( window.addEventListener ){
            obj.addEventListener('DOMNodeInserted', callback, false)
            obj.addEventListener('DOMNodeRemoved', callback, false)
        }
    }
})()

///////////////////////////////////
// boolean inputs event listener //
///////////////////////////////////
function booleanInputsEventHandler(e) {
    const element = e.currentTarget;
    if (element.classList[0].includes("True")) {
        element.parentElement?.children[1].classList.remove("guifySelectFalse");
        element.classList.add("guifySelectTrue");
    } else {
        element.parentElement?.children[0].classList.remove("guifySelectTrue");
        element.classList.add("guifySelectFalse");
    }
}
function giveLifeToBooleanInputs() {
    const elements = document.querySelectorAll(".guifyCheckBox > div");
    elements.forEach((element) => {
        element.addEventListener("click", booleanInputsEventHandler)
    })
}

///////////////////////////////////
// Drop Down icon Event listener //
///////////////////////////////////
function ElementDropDownSvgEventHandler(e) {
    const element = e.currentTarget;
    // close all opened value bodies when click on an element and reset rotation for dropdown Icon
    let doNothing = false;
    Array.from(element.parentElement.children).forEach((el) => {
        if (el.classList.contains('guifyArrayElement')) {
            if (element.firstElementChild.firstElementChild.innerHTML == el.firstElementChild.firstElementChild.innerHTML) {
                doNothing = true;
            }
        } else {
            if (doNothing) {
                doNothing = false;
                return;
            }
            el.classList.add("GuiHiddenElement");
            el.previousElementSibling.querySelector('.guifyDropDownButton').classList.remove("GuiRotated");
        }
    })
    // adding a bottom border to the array element if its the final element
    if (element.classList.contains('last')) {
        element.classList.toggle("guifyRemoveBotomBorder");
    }
    // hiding and unhiding content of array element
    element.nextElementSibling.classList.toggle("GuiHiddenElement");
    element.querySelector('.guifyDropDownButton').classList.toggle("GuiRotated");

}
function giveLifeToElementDropDownSvg(e) {
    const elements = document.querySelectorAll(".guifyArrayElement");
    elements.forEach((element) => {
        element.addEventListener("click", ElementDropDownSvgEventHandler)
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// event listener for the popup that shows when you click on the add element or property button //
//////////////////////////////////////////////////////////////////////////////////////////////////
function guifyAddButtonEventHandler(e) {
    const element = e.target;
    const guifyAddElementWidgets = document.querySelectorAll(".guifyAddElementWidget")
    guifyAddElementWidgets.forEach((guifyAddElementWidget) => {
        guifyAddElementWidget.classList.add("GuiHiddenElement")
    })
    if (element.classList.contains("guifyAddButton")) {
        const addELementsWidget = element.nextElementSibling;
        addELementsWidget.classList.remove("GuiHiddenElement")
    }
}
function giveLifeToguifyAddButton(e) {
    window.addEventListener("click", guifyAddButtonEventHandler);
}

///////////////////////////////////////////////////////////////////////////
// Event listener for one of the elements you select on the poped up     //
// widget that show when you click on the add property or element button //
///////////////////////////////////////////////////////////////////////////
function guifyAddElementEventHandler(e) {
    const element = e.currentTarget;
    const elementType = e.currentTarget.dataset.type;
    const guifyBody = element.closest('.guifyObjectProperty').querySelector(".guifyBody");
    const containerType = guifyBody.classList.contains("guiArrayContainer") ? "array" : "object";
    const secondColor = guifyBody.style.backgroundColor == "var(--second-color)" ? "var(--lighter-main-color)" : "var(--second-color)";
    const firstColor = guifyBody.style.backgroundColor != "var(--second-color)" ? "var(--lighter-main-color)" : "var(--second-color)";
    if (guifyBody.dataset.length == 0) {
        guifyBody.innerHTML = '';
    }
    if (containerType == 'object') {
        if (elementType == 'object') {
            guifyBody.insertAdjacentHTML("beforeend", Guify.getEmptyHtmlcontainer(elementType, "Key Label", secondColor));
        } else if (elementType == 'array') {
            guifyBody.insertAdjacentHTML("beforeend", Guify.getEmptyHtmlcontainer(elementType, "Key Label", secondColor));
        } else {
            guifyBody.insertAdjacentHTML("beforeend", Guify.getHtmlByElementType(elementType, "Key Label", "", secondColor));
            const lastElement = guifyBody.lastElementChild;
            const span = lastElement.querySelector('span');
            // focusing on the added element key
            span.focus();
            // changing the cursor position to be at the end
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(span);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    } else if (containerType == 'array') {
        if (elementType == 'object') {
            const element = Guify.getEmptyHtmlcontainer(elementType, null, firstColor);
            guifyBody.insertAdjacentHTML("beforeend", Guify.getArrayELementContainerHtml(element, elementType, parseInt(guifyBody.dataset.length) + 1), secondColor);
        } else if (elementType == 'array') {
            const element = Guify.getEmptyHtmlcontainer(elementType, null, secondColor);
            guifyBody.insertAdjacentHTML("beforeend", Guify.getArrayELementContainerHtml(element, elementType, parseInt(guifyBody.dataset.length) + 1), secondColor);
        } else {
            const element = Guify.getHtmlByElementType(elementType, null, "", secondColor);
            guifyBody.insertAdjacentHTML("beforeend", Guify.getArrayELementContainerHtml(element, elementType, parseInt(guifyBody.dataset.length) + 1), secondColor);
        }
        // setting some classes for styling consistencies purposes
        try {
            guifyBody.lastElementChild.classList.add('guifyRemoveBotomBorder');
            guifyBody.lastElementChild.previousElementSibling.classList.add('guifyRemoveBotomBorder');
            guifyBody.lastElementChild.previousElementSibling.classList.add('last');
            guifyBody.lastElementChild.previousElementSibling.previousElementSibling.classList.remove('guifyRemoveBotomBorder');
            guifyBody.lastElementChild.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove('guifyRemoveBotomBorder');
            guifyBody.lastElementChild.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove('last');
        } catch (error) {
            
        }
    }
    guifyBody.dataset.length++;
}
function giveLifeToGuifyAddElementInPopup(e) {
    const elements = document.querySelectorAll(".guifyAddElement");
    elements.forEach((element) => {
        element.addEventListener("click", guifyAddElementEventHandler)
    })
}

//////////////////////////////////
// delete button Event listener //
//////////////////////////////////

// function to organizes the indexes and the styling after each time we remove an element (can be used for other actions too)
function redrawAfterArrayElementDeletion(el) {
    const childElements = Array.from(el.children);
    const containerElementLength = el.dataset.length;
    console.log(containerElementLength);
    // draw the empty content if the length of the container is zero
    if (containerElementLength == 0) {
        el.innerHTML = Guify.emptyArrayContainerInnerHtml();
        return;
    }
    // looping through the array elements
    let guifyIndex = 1;
    for (let index = 0; index < childElements.length; index++) {
        const element = childElements[index];
        // resets the indexes of the elements of the array
        if (element.firstElementChild.firstElementChild.classList.contains('guifyIndex')) {
            element.firstElementChild.firstElementChild.innerHTML = guifyIndex;
            guifyIndex++;
        }
        // adjust styling classes
        if (index == childElements.length - 1) {
            element.classList.add('guifyRemoveBotomBorder')
            element.previousElementSibling.classList.add('guifyRemoveBotomBorder')
            element.previousElementSibling.classList.add('last')
        }
    }
    console.log(childElements)
}

function redrawAfterObjectPropetyDeletion(el) {
    const containerElementLength = el.dataset.length;
    console.log(el)
    console.log(containerElementLength)
    if (containerElementLength == 0) {
        el.innerHTML = Guify.emptyObjectContainerInnerHtml();
        return;
    }
}

function guifyDeleteButtonEventHandler(e) {
    const element = e.currentTarget;
    const forData = e.currentTarget.dataset.for;
    // this is executed when deleting the array or object container
    if (forData == 'container') {
        // update parent data length
        console.log('main container')
        const container = element.parentElement.parentElement.parentElement;
        container.parentElement.dataset.length--;
        container.remove();
    } else if(forData == 'objectElement') {
        console.log('object Element')
        const container = element.parentElement.parentElement.parentElement;
        container.dataset.length--;
        element.parentElement.parentElement.remove();
        redrawAfterObjectPropetyDeletion(container);
    } else if (forData == 'arrayElement') {
        const container = element.parentElement.parentElement.parentElement;
        container.dataset.length--;
        element.parentElement.parentElement.nextElementSibling.remove();
        element.parentElement.parentElement.remove();
        redrawAfterArrayElementDeletion(container);
    }
}
function giveLifeToDeleteButton(e) {
    const elements = document.querySelectorAll(".guifyDeleteButton");
    elements.forEach((element) => {
        element.addEventListener("click", guifyDeleteButtonEventHandler)
    })
}

/////////////////////////////
// this is the entry point //
/////////////////////////////
export function initEvenListeners() {
    document.addEventListener("DOMContentLoaded", (e) => {
        const element = document.querySelector("body");
        observeDOM(element, (e) => {
            const guifyContainer = document.querySelector('.guifyContainer');
            if (guifyContainer) {
                giveLifeToBooleanInputs();
                giveLifeToElementDropDownSvg();
                giveLifeToguifyAddButton();
                giveLifeToGuifyAddElementInPopup();
                giveLifeToDeleteButton();
            }
        })
    })
}
