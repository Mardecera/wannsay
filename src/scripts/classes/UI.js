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
        const tweetItem = createElementHTML({ clases: ['tweet-item'] })
        const tweetHead = this.getHeadTweet(date, time)
        const tweetBody = this.getBodyTweet(tweet)
        const tweetButton = this.getButtonDelete(id)
        
        tweetButton.onclick = () => { tweetItem.remove() }
        tweetItem.appendChild(tweetHead)
        tweetItem.appendChild(tweetBody)
        tweetItem.appendChild(tweetButton)

        return tweetItem
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
        const minutes = time.split(':')[1];
        const meridianHour = {
            meridian: hour > 12 ? 'pm' : 'am',
            hour: hour > 12? hour - 12 : hour
        }

        return `${meridianHour.hour}:${minutes} ${meridianHour.meridian}`            
    }

    getHeadTweet(date = '', time = '') {
        const head = createElementHTML({
            clases: ['tweet-head']
        })
        const divProfile = createElementHTML({
            clases: ['tweet-profile']
        })
        const imageProfile = createElementHTML({
            type: 'img',
            src: './public/images/_profile.svg'
        })
        const divInfo = createElementHTML({
            clases: ['tweet-info']
        })
        const divUsername = createElementHTML({
            clases: ['tweet-username'],
            textContent: 'Me'
        })

        const divDate = createElementHTML({
            clases: ['tweet-date'],
            textContent: `Posted ${date} at ${this.toMeridian(time)}`
        })

        divProfile.appendChild(imageProfile)
        divInfo.appendChild(divUsername)
        divInfo.appendChild(divDate)
        head.appendChild(divProfile)
        head.appendChild(divInfo)

        return head
    }

    getBodyTweet(tweet) {
        const divContent = createElementHTML({
            type: 'pre',
            clases: ['tweet-content'],
            textContent: tweet
        })

        return divContent
    }

    getButtonDelete(id) {
        const buttonDelete = createElementHTML({
            type: 'button',
            textContent: 'x',
            clases: ['btn-delete'],
            attributes: [['data_id', id]]
        })

        return buttonDelete
    }
}