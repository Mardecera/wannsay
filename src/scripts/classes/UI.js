import { createElementHTML } from "../functions/fucntions.js"
import * as DOM from '../functions/selectors.js'

export class UI{
    showTweets(tweets) {
        DOM.listVoid.style.display = 'none'

        tweets.forEach((tweet) => {
            const divTweet = this.createTweetHTML(tweet)
            DOM.tweetsList.appendChild(divTweet)
        })
    }

    addTweet(tweet) {
        DOM.listVoid.style.display = 'none'
        const divTweet = this.createTweetHTML(tweet)
        DOM.tweetsList.appendChild(divTweet)
    }

    createTweetHTML({tweet, date, time, id}) {
        const divTweet = createElementHTML({ clases: ['tweet-item'] })
        const divHead = createElementHTML({
            clases: ['tweet-date'],
            textContent: `Posted ${date} at ${this.toMeridian(time)}`
        })
        const divContent = createElementHTML({
            type: 'pre',
            clases: ['tweet-content'],
            textContent: tweet
        })
        const buttonDelete = createElementHTML({
            type: 'button',
            textContent: 'x',
            clases: ['btn-delete'],
            attributes: [['data_id', id]]
        })

        buttonDelete.onclick = () => {
            divTweet.remove()
        }

        divTweet.appendChild(divHead)
        divTweet.appendChild(divContent)
        divTweet.appendChild(buttonDelete)

        return divTweet
    }

    messageToYou(prhase, picture) {
        console.log('messagetoyou...')
        DOM.container.style.display = 'none'

        const card = createElementHTML({clases: ['card']})
        const cardText = createElementHTML({
            clases: ['card-text'],
            textContent: `${prhase} ${String.fromCharCode(10084)}`
        })
        const cardPicture = createElementHTML({clases: ['card-picture']})
        const btnClose = createElementHTML({
            type: 'button',
            textContent: 'x',
            clases: ['btn-close']
        })

        btnClose.onclick = () => {
            card.remove()
            DOM.container.style.display = 'inherit'
        }

        cardPicture.appendChild(picture)
        card.appendChild(cardText)
        card.appendChild(cardPicture)
        card.appendChild(btnClose)
        
        DOM.body.appendChild(card)
    }

    showAlertListVoid() {
        DOM.listVoid.style.display = 'flex'
    }

    toMeridian(time) {
        const hour = +time.split(':')[0]
        const minutes = +time.split(':')[1];
        const meridianHour = {
            meridian: hour > 12 ? 'pm' : 'am',
            hour: hour > 12? hour - 12 : hour
        }

        return `${meridianHour.hour}:${minutes} ${meridianHour.meridian}`            
    }
}