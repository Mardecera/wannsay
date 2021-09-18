import { UI } from "./UI.js"
import { phrases } from "../functions/selectors.js"

export class Manager extends UI{
    constructor() {
        super()
        this.cats = []
        this.tweets = []
    }

    loadTweets() {
        this.tweets = this.getLocalStorage('tweets') || []
        if (!!this.tweets.length) { this.showTweets(this.tweets) }
        else { this.showAlertListVoid() }
    }

    addTweet({ title, content }) {
        const textNormalize = content.normalize("NFD")
        const textLower = textNormalize.replace(/[\u0300-\u036f]/g, "").toLowerCase()
        const textList = textLower.split(' ')
        const wordSpecial = textList.some(item => {
            return item === 'rocio' || item === 'jonathan' || item === 'juntos'
        })

        if (wordSpecial) {
            const prhaseRandom = phrases[Math.round(Math.random() * (phrases.length - 1))]
            const pictureRandom = Math.round(Math.random() * 16)
            this.messageToYou(prhaseRandom, pictureRandom)
        }
        else {
            const tweet = {
                id: Date.now(), 
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                title: title,
                content: content
            }
            this.tweets = [...this.tweets, tweet]
            this.setLocalStorage('tweets')
            this.showTweet(tweet)
        }
    }

    deleteTweet(id) {
        this.tweets = this.tweets.filter(tweet => tweet.id !== id)
        this.setLocalStorage('tweets')
        if (!!!this.tweets.length) {
            this.showAlertListVoid()
        }
    }

    setLocalStorage(nameStorage) {
        localStorage.setItem(nameStorage, JSON.stringify(this.tweets))
    }

    getLocalStorage(nameStorage) {
        return JSON.parse(localStorage.getItem(nameStorage))
    }
}