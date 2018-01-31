export const createElement = (tag, className, content = '') => {
    const elem = document.createElement(tag)

    className.split(' ').map(cls => elem.classList.add(cls))
    elem.innerHTML = content

    return elem
}
