import classnames from 'classnames'
import { createElement } from '../utils.js'
import './Button.styl'

class Button {
    constructor(props) {
        this.props = props
        this.render()
    }

    render() {
        const {
            text,
            action,
            onClick } = this.props
        const classes = classnames({
            Button: true,
            Button_action: action
        })

        this.domElem = createElement({
            tag: 'button',
            className: classes
        })

        this.domElem.onclick = onClick

        this.domElem.append(text)
    }
}

export default Button
