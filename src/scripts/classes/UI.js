import { createElementHTML } from "../functions/fucntions.js"
import * as DOM from '../functions/selectors.js'

const CONFIRMATION_MESSAGE = 'Desea eliminar este tweet?'

export class UI{
    showTweets(tweets) {
        DOM.listVoid.style.display = 'none'

        tweets.forEach((tweet) => {
            const divTweet = this.createTweetHTML(tweet)
            DOM.tweetsList.appendChild(divTweet)
        })
    }

    showTweet(tweet) {
        DOM.listVoid.style.display = 'none'
        const divTweet = this.createTweetHTML(tweet)
        DOM.tweetsList.appendChild(divTweet)
    }

    showConfirmation(id, tweetHTML) {
        const confirmationBG = createElementHTML({clases: ['confirmation-bg']})
        const confirmation = createElementHTML({clases: ['confirmation']})
        const confirmationBody = createElementHTML({
            clases: ['confirmation-body'],
            textContent: CONFIRMATION_MESSAGE
        })
        const confirmationButtons = this.getConfirmationButtons(confirmationBG, tweetHTML, id)

        confirmation.appendChild(confirmationBody)
        confirmation.appendChild(confirmationButtons)
        confirmationBG.appendChild(confirmation)

        DOM.container.appendChild(confirmationBG)
    }

    createTweetHTML({id, date, time, title, content}) {
        const tweetHTML = createElementHTML({ clases: ['tweet-item'] })
        const tweetHead = this.getHeadTweet(date, time, title)
        const tweetBody = this.getBodyTweet(content)
        const tweetButton = this.getButtonDelete(id, tweetHTML)
        
        tweetHTML.appendChild(tweetHead)
        tweetHTML.appendChild(tweetBody)
        tweetHTML.appendChild(tweetButton)

        return tweetHTML
    }

    messageToYou(prhase = '', picture = 0) {
        DOM.container.style.display = 'none'

        const card = createElementHTML({clases: ['card']})
        const cardText = createElementHTML({
            clases: ['card-text'],
            textContent: `${prhase} ${String.fromCharCode(10084)}`
        })
        const cardPicture = createElementHTML({ clases: ['card-picture'] })
        const pictureTag = createElementHTML({
            type: 'img',
            src: `./public/images/cat-${picture}.gif`
        })
        const btnClose = createElementHTML({
            type: 'button',
            textContent: 'x',
            clases: ['btn-close']
        })

        btnClose.onclick = () => {
            card.remove()
            DOM.container.style.display = 'inherit'
        }

        cardPicture.appendChild(pictureTag)
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

    getHeadTweet(date = '', time = '', title = '') {
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
            textContent: title
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

    getButtonDelete(id, tweetHTML) {
        const buttonDelete = createElementHTML({
            type: 'button',
            textContent: 'x',
            clases: ['btn-delete']
        })

        buttonDelete.onclick = () => this.showConfirmation(id, tweetHTML)

        return buttonDelete
    }

    getConfirmationButtons(confirmationHTML, tweetHTML, id) {
        const divButtons = createElementHTML({clases: ['btns']})
        const buttonAcepted = createElementHTML({type: 'button', clases: ['btn-acepted'], textContent: 'Aceptar'})
        const buttonCancel = createElementHTML({ type: 'button', clases: ['btn-cancel'], textContent: 'Cancelar' })
        
        buttonAcepted.onclick = () => {
            this.deleteTweet(id)
            tweetHTML.remove()
            confirmationHTML.remove()
        }
        buttonCancel.onclick = () => confirmationHTML.remove()
        divButtons.appendChild(buttonAcepted)
        divButtons.appendChild(buttonCancel)
        
        return divButtons
    }
}