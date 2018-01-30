import Chat from './Chat'
import stages from './stages.js'

const $ = document.querySelector.bind(document)
const chat = new Chat(stages)

$('#root').append(chat.domElem);
