import poststyles from './post-Card.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
	'image' = 'image',
	'isLiked' = 'isLiked',
	'isSaved' = 'isSaved',
	'likescount' = 'likescount',
	'username' = 'username',
	'description' = 'description',
}

class PostCard extends HTMLElement {
	image?: string;
	isLiked?: boolean;
	isSaved?: boolean;
	likescount?: string;
	username?: string;
	description?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	changeLike = () => {
		this.isLiked = !this.isLiked;
		console.log('isLiked:', this.isLiked);
		this.render();
	};

	changeSaved = () => {
		this.isSaved = !this.isSaved;
		console.log('isSaved:', this.isSaved);
		this.render();
	};

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			image: null,
			isLiked: null,
			isSaved: null,
			likescount: null,
			username: null,
			description: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute.isLiked:
				this.isLiked = newValue === 'true';
				break;
			case Attribute.isSaved:
				this.isSaved = newValue === 'true';
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();

		// Obtén los botones dentro del shadowRoot
		const likeBtn = this.shadowRoot?.querySelector('#likeBtn');
		const saveBtn = this.shadowRoot?.querySelector('#saveBtn');

		// Agrega listeners de eventos solo si los botones existen
		likeBtn?.addEventListener('click', this.changeLike.bind(this));
		saveBtn?.addEventListener('click', this.changeSaved.bind(this));
	}

	render() {
		let corazon = '../../assets/emptyHeart.png';
		if (this.isLiked) {
			corazon = '../../assest/heart.png';
		}

		let save = '../../assest/emptySave.png';
		if (this.isSaved) {
			save = '../../assest/save.png';
		}

		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';

			const css = this.ownerDocument.createElement('style');
			css.textContent = `

    `;

			this.shadowRoot.appendChild(css);

			this.shadowRoot.innerHTML += `
						 <style> ${poststyles}</style>

            <section class="container">
						 <div class="imgContainer">
						   <img class= "img" src="${this.image}" alt="Post image">
						 </div>
						 <div class="userContent">
						   <div class="iconContainer">
							    <img class= "icon" src="${this.isLiked}" alt="Like icon" id="likeBtn">
							   <img class= "icon" src="${this.isSaved}" alt="Save icon" id="saveBtn">
							 </div>
							   <p class= "likes">${this.likescount} likes</p>
							 <p
							   <span class= "username" >${this.username} </span>: <span class= "description"> ${this.description}</span>
							 </p>

						 </div>
            </section>
        `;
		}
	}
}

customElements.define('post-card', PostCard);
export default PostCard;
