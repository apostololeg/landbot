export const createElement = (tag, className, content = '') => {
    const elem = document.createElement(tag)

    elem.classList.add(className)
    elem.innerHTML = content

    return elem
}
