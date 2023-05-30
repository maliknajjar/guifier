export function booleanEventHandler (e: MouseEvent, trueElement: HTMLElement, falseElement: HTMLElement): void {
    const targetElement = e.target as HTMLElement
    if (targetElement.classList.contains('guifyBooleanTrueElement')) {
        trueElement.classList.add('guifyBooleanTrueElementSelect')
        falseElement.classList.remove('guifyBooleanFalseElementSelect')
    } else if (targetElement.classList.contains('guifyBooleanFalseElement')) {
        falseElement.classList.add('guifyBooleanFalseElementSelect')
        trueElement.classList.remove('guifyBooleanTrueElementSelect')
    }
}
