function createElementHTML({ type = 'div', clases = [], textContent = '', src = '', attributes = [] } = {}) {
    const element = document.createElement(type)

    clases.forEach(clas => { element.classList.add(clas) })
    attributes.forEach(attribute => element.setAttribute(attribute[0], attribute[1]))

    if (src !== '') { element.src = src }
    element.textContent = textContent
    
    return element
}

export { createElementHTML }