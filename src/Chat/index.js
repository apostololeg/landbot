import { bind } from 'decko'
import Button from '../Button'
import Message from '../Message'
import { createElement } from '../utils.js'
import './Chat.styl'

const DELAY = 200
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
        this.addMessage(text, 'right')
        this.currentStage = stage
        this.currentStep = 0
        this.next()
    }

    render() {
        this.domElem = createElement('div', 'Chat')


        this._content = createElement('div', 'Chat__content')
        this._actions = createElement('div', 'Chat__actions')

        this.domElem.append(this._content)
        this.renderTyping()
        this.domElem.append(this._actions)

    }

    renderTyping() {
        this._typing = new Message([
            createElement('div', 'Chat__typing-dot'),
            createElement('div', 'Chat__typing-dot'),
            createElement('div', 'Chat__typing-dot')
        ])

        this._typing.domElem.classList.add('Chat__typing')
        this.domElem.append(this._typing.domElem)
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
                this.addMessage(step.text)
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

    addMessage(text, align) {
        const message = new Message(text, align)

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
