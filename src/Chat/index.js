import { bind } from 'decko'
import Button from '../Button'
import Message from '../Message'
import { createElement } from '../utils.js'
import './Chat.styl'

const DELAY = 300
const TYPING = 500

class Chat {
    constructor(stages) {
        this.stages = stages
        this.currentStage = 'initial'
        this.currentStep = 0 // step number in stage scope
        this.history = [] // TODO: use LocalStorage

        this.render()
        this.next()
    }

    getStage() {
        return this.stages[this.currentStage]
    }

    getStep() {
        return this.getStage()[this.currentStep]
    }

    getActions() {
        return this.getStep().actions
    }

    onAction(text, stage) {
        this.addMessage({ content: text }, 'right')
        this.currentStage = stage
        this.currentStep = 0
        this.updateActions()
        this.next()
    }

    render() {
        this.domElem = createElement({ className: 'Chat' })
        this._inner = createElement({ className: 'Chat__inner' });

        [
            this.renderContent(),
            this.renderTyping(),
            this.renderActions()
        ].forEach(domElem => this._inner.append(domElem))

        this.domElem.append(this._inner)
    }

    renderContent() {
        this._content = createElement({ className: 'Chat__content' })

        return this._content
    }

    renderTyping() {
        this._typing = new Message({
            content: [
                createElement({ className: 'Chat__typing-dot' }),
                createElement({ className: 'Chat__typing-dot' }),
                createElement({ className: 'Chat__typing-dot' })
            ]
        })

        this._typing.domElem.classList.add('Chat__typing')

        return this._typing.domElem
    }

    renderActions() {
        this._actions = createElement({ className: 'Chat__actions' })

        return this._actions
    }

    delay(time = DELAY) {
        clearTimeout(this._delay)

        return new Promise(resolve => {
            this._delay = setTimeout(resolve, time)
        })
    }

    typing(time = TYPING, fn) {
        clearTimeout(this._timeout)

        this.getStep() && this.showTyping()

        return this.delay(time)
            .then(this.hideTyping)
    }

    next() {
        const step = this.getStep()

        if (!step) {
            return
        }

        const { delay, typing } = step

        this.delay(delay)
            .then(() => this.typing(typing))
            .then(() => {
                this.history.push(step)
                this.addMessage(step)
                this.updateActions()

                if (!this.getActions()) {
                    if (step.redirect) {
                        this.currentStage = step.redirect
                        this.currentStep = 0
                    } else {
                        this.currentStep++
                    }

                    this.next()
                }
            })
    }

    updateActions() {
        this._actions.innerHTML = ''

        const actions = this.getActions()

        if (!actions) {
            return
        }

        actions.map(({ type, text, link }) => {
            let button = new Button({
                text,
                action: type === 'action',
                onClick: () => this.onAction(text, link)
            })

            this._actions.append(button.domElem)
        })
    }

    addMessage(step, align) {
        const message = new Message({
            ...step,
            align,
            showTime: true
        })

        this._content.append(message.domElem)
    }

    showTyping() {
        this.domElem.classList.add('Chat_typing')
    }

    @bind hideTyping() {
        this.domElem.classList.remove('Chat_typing')
    }
}

export default Chat
