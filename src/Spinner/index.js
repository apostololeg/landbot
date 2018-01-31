import { createElement } from '../utils.js'
import './Spinner.styl'

class Spinner {
    constructor() {
        this.render()
    }

    render() {
        this.domElem = createElement({ className: 'Spinner' })
        this.domElem.innerHTML = `<svg class="Spinner__circular" viewBox="25 25 50 50">
            <circle class="Spinner__path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>`
    }
}

export default Spinner
