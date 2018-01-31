import classnames from 'classnames'
import { createElement } from '../utils.js'
import './Message.styl'

class Message {
    constructor(props) {
        this.props = props
        this.render()
    }

    render() {
        const {
            align,
            content,
            component,
            showTime } = this.props
        const classes = classnames({
            Message: true,
            [`Message_${align}`]: Boolean(align)
        })
        const wrapper = createElement({ className: 'Message__wrapper' })
        const inner = createElement({ className: 'Message__inner' })

        this.domElem = createElement({ className: classes })

        if (component) {
            inner.append(component())
        }

        if (content) {
            const contentELem = createElement({ className: 'Message__content' })

            if (Array.isArray(content)) {
                content.forEach(item => contentELem.append(item))
            } else {
                contentELem.append(content)
            }

            inner.append(contentELem)
        }

        wrapper.append(inner)
        showTime && wrapper.append(this.renderTime())
        this.domElem.append(wrapper)

    }

    renderTime() {
        const date = new Date()
        const hours = date.getHours()
        const min = ('0' + date.getMinutes()).slice(-2)

        return createElement({
            className: 'Message__time',
            content: `${hours}:${min}`
        })
    }
}

export default Message
