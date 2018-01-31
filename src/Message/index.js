import classnames from 'classnames'
import { createElement } from '../utils.js'
import './Message.styl'

class Message {
    constructor(content = '', align) {
        this.content = content
        this.align = align
        this.render()
    }

    getTime() {
        const date = new Date()
        const hours = date.getHours()
        const min = ('0' + date.getMinutes()).slice(-2)

        return createElement('div', 'Message__time', `${hours}:${min}`)
    }

    render() {
        const classes = classnames({
            Message: true,
            [`Message_${this.align}`]: Boolean(this.align)
        })
        const inner = createElement('div', 'Message__inner')

        this.domElem = createElement('div', classes)


        if (Array.isArray(this.content)) {
            this.content.forEach(item => inner.append(item))
        } else {
            inner.append(this.content)
        }

        inner.append(this.getTime())
        this.domElem.append(inner)
    }
}

export default Message
