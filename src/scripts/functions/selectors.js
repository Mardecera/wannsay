const form = document.querySelector('#formulario')
const buttonSubmit = document.querySelector('#btn-submit')
const tweetsList = document.querySelector('#lista-tweets')
const tweetInput = document.querySelector('#tweet')
const limitWords = form.querySelector('#limit-count')
const btnDelete = document.querySelector('.btn-delete')
const container = document.querySelector('.container')
const body = document.querySelector('body')
const listVoid = document.querySelector('.list-void')

const phrases = [
    '¡Ten un lindo día!',
    'Espero estes bien',
    'Abrigate', 'Come bien',
    '¡Nunca te rindas! ¡Eres la mejor!',
    'Aún me encanta tu frentesita c:',
    'Tocando la guitarra\njajajaja',
    'Si mañana es jueves,\nun besote!',
    '1, 2, 3...\njajajajaja\nNo aparecerá nada.', '*KISS*'
]

export {
    form,
    buttonSubmit,
    tweetsList,
    tweetInput,
    limitWords,
    phrases,
    btnDelete,
    container,
    body,
    listVoid
}