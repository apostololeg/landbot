import Chat from './Chat'
import stages from './stages.js'
import './common.styl'

const $ = document.querySelector.bind(document)
const chat = new Chat(stages)

$('#root').append(chat.domElem);
