import { createElement } from '../utils.js'
import './Message.styl'

class Message {
    constructor(content) {
        this.content = content

        this.render()
    }

    getTime() {
        var date = new Date()
        var hours = date.getHours()
        var min = ('0' + date.getMinutes()).slice(-2)

        return createElement('div', 'Message__time', `${hours}:${min}`)
    }

    render() {
        this.domElem = createElement('div', 'Message')

        this.domElem.append(this.content)
        this.domElem.append(this.getTime())
    }
}

export default Message
