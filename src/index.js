import Chat from './Chat'
import stages from './stages.js'
import './common.styl'

const $ = document.querySelector.bind(document)
const chat = new Chat(stages)

window.c = chat

$('#root').append(chat.domElem);
