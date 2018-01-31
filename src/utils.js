export const createElement = (props) => {
    const {
        tag,
        className,
        content,
        attrs
    } = props
    const elem = document.createElement(tag || 'div')

    if (className) {
        className.split(' ').map(cls => elem.classList.add(cls))
    }

    if (attrs) {
        Object.keys(attrs).forEach(attr => elem.setAttribute(attr, attrs[attr]))
    }

    if (content) {
        elem.append(content)
    }

    return elem
}
