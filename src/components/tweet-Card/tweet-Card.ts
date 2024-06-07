import { appState } from '../../store';
import { getTweet } from '../../utils/firebase';
import tweetstyles from './tweet-Card.css';

export enum Attribute {
	'image' = 'image',
	'description' = 'description',
	'username' = 'username',
}

class TweetCard extends HTMLElement {
	image?: string;
	description?: string;
	username?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			image: null,
			description: null,
			username: null,
		};
		return Object.keys(attrs);
	}
	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			// Limpiar el contenido existente en el shadowRoot, para que no se duplique el contenido
			this.shadowRoot.innerHTML = '';
			// creamos nuestro css para solo el componente.
			this.shadowRoot.innerHTML += `
						 <style> ${tweetstyles}</style>
      <section class="container">
				<div class="tweetandimg">
				  <div class=tweet>
					 <p class= "description"> ${this.description} </p>
					</div>
					<div class="img">
					 <div class= "img-container">
					   <img class= "img-post" src="${this.image}" alt="Post image">
				   </div>
					</div>
				</div>
				<div class='infoUser'>
				 <p class= "username"> ${this.username} </p>
				</div>
			</section>

        `;
		}
	}
}

customElements.define('tweet-card', TweetCard);
export default TweetCard;
