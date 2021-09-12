import { UI } from "./UI.js"
import { createElementHTML } from "../functions/fucntions.js"
import { phrases } from "../functions/selectors.js"

export class Manager{
    constructor() {
        this.cats = []
        this.tweets = []
        this.UI = new UI()
        this.loadcats()
    }

    loadTweets() {
        this.tweets = this.getLocalStorage('tweets') || []
        if (!!this.tweets.length) {
            this.UI.showTweets(this.tweets)
        } else {
            this.UI.showAlertListVoid()
        }
    }

    addTweet(tweet) {
        const nameTest = tweet.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        const nameList = nameTest.split(' ')
        const wordSpecial = nameList.some(item => {
            return item === 'rocio' || item === 'jonathan' || item === 'juntos'
        })

        if (wordSpecial) {
            const prhaseRandom = phrases[Math.round(Math.random() * (phrases.length - 1))]
            const pictureRandom = this.cats[Math.round(Math.random() * (this.cats.length - 1))]
            this.UI.messageToYou(prhaseRandom, pictureRandom)
        }
        else {
            const tweetObj = {
                id: Date.now(), 
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                tweet
            }
            this.tweets = [...this.tweets, tweetObj]
            this.setLocalStorage('tweets')
            this.UI.addTweet(tweetObj)
        }
    }

    deleteTweet(id) {
        this.tweets = this.tweets.filter(tweet => tweet.id !== id)
        this.setLocalStorage('tweets')
        if (!!!this.tweets.length) {
            this.UI.showAlertListVoid()
        }
    }

    setLocalStorage(nameStorage) {
        localStorage.setItem(nameStorage, JSON.stringify(this.tweets))
    }

    getLocalStorage(nameStorage) {
        return JSON.parse(localStorage.getItem(nameStorage))
    }

    loadcats() {
        const cats = [...Array(17).keys()].map(element => {
            return createElementHTML({
                type: 'img',
                clases: ['card-img'],
                src: `./public/images/cat-${element}.gif`
            })
        })
        this.cats = [...this.cats, ...cats]
    }
}