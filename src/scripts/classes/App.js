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
                this.MANAGER.addTweet(this.getFormData())
                this.formReset()
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

    getFormData() {
        return {
            title: DOM.tweetTitle.value,
            content: DOM.tweetInput.value
        }
    }
}
