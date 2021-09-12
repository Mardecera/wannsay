import { createElementHTML } from "../functions/fucntions.js"
import * as DOM from "../functions/selectors.js"
import { Manager } from "./Manager.js"

export class App{
    constructor() {
        this.MANAGER = new Manager()
        this.init()
    }

    init() {
        window.onload = () => {
            this.eventLimitWord()
            this.MANAGER.loadTweets()

            DOM.form.addEventListener('submit', (event) => {
                event.preventDefault()
                this.MANAGER.addTweet(DOM.tweetInput.value)
                this.formReset()
            })
            DOM.tweetsList.addEventListener('click', (event) => {
                event.preventDefault()
                const btnDeleteID = event.target.getAttribute('data_id')
                if (!!btnDeleteID) { this.MANAGER.deleteTweet(+btnDeleteID) }
            })
        }
    }

    eventLimitWord() {
        DOM.tweetInput.addEventListener('input', (event) => {
            event.preventDefault()
            DOM.limitWords.textContent = event.target.value.length
        })
        DOM.limitWords.textContent = DOM.tweetInput.value.length
    }

    formReset() {
        DOM.form.reset()
        DOM.limitWords.textContent = 0
    }
}
