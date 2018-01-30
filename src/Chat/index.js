import Message from '../Message'
import { createElement } from '../utils.js'
import './Chat.styl'

const TIMEOUT = 500

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

    onAction(stage) {
        this.currentStage = stage
        this.currentStep = 0
        this.next()
    }

    render() {
        this.domElem = createElement('div', 'Chat')

        this._content = createElement('div', 'Chat__content')
        this._actions = createElement('div', 'Chat__actions')

        this.domElem.append(this._content)
        this.domElem.append(this._actions)
    }

    next() {
        const step = this.getStep()

        if (!step) {
            return
        }

        this.history.push(step)

        this.updateContent()
        this.updateActions()

        if (!this.getActions()) {
            // writing...
            setTimeout(() => {
                this.currentStep++
                this.next()
            }, TIMEOUT)
        }
    }

    updateActions() {
        this._actions.innerHTML = ''

        const actions = this.getActions()

        if (!actions) {
            return
        }

        actions.map(({ text, link }) => {
            let elem = createElement('button', 'Chat__action', text)

            elem.onclick = () => this.onAction(link)

            this._actions.append(elem)
        })
    }

    updateContent() {
        const { text } = this.getStep()
        const message = new Message(text)

        this._content.append(message.domElem)
    }
}

export default Chat
