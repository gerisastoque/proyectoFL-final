import indexstyles from './profile.css';

import MenuCard, { Attribute as MenuCardAttribute } from '../../components/menu-Card/menu-Card';
import userProfile, { Attribute as userProfileAttribute } from '../../components/userProfile/userProfile';
import profileGrid, { Attribute as profileGridAttribute } from '../../components/feed-Grid/profile-Grid';
import { MenuFeed, tweetCard } from '../../components/export';

// firebase
import firebase from '../../utils/firebase';
import { FeedGrid } from '../../types/FeedGrid';
import { getFeedGrid } from '../../utils/firebase';

// parámetros
const formData: Omit<FeedGrid, 'id'> = {
	img: '',
	img1: '',
	img2: '',
};

class Profile extends HTMLElement {
	message: profileGrid[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	// valores

	changeimg(e: any) {
		formData.img = e.target.value;
		formData.img1 = e.target.value;
		formData.img2 = e.target.value;
	}

	async render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = ``;

		const styleElement = document.createElement('style');
		styleElement.textContent = indexstyles;
		this.shadowRoot?.appendChild(styleElement);

		// Agregar userProfile y MenuProfile

		const menucard = this.ownerDocument.createElement('menu-card') as MenuCard;
		menucard.setAttribute(MenuCardAttribute.user, '@a.miller');
		this.shadowRoot?.appendChild(menucard);

		const userProf = this.ownerDocument.createElement('user-profile') as userProfile;
		userProf.setAttribute(userProfileAttribute.user, '@a.miller');
		this.shadowRoot?.appendChild(userProf);

		// Obtener los datos de los posts desde Firebase
		const postData = await getFeedGrid();

		// Crear contenedor para las imágenes de los posts
		const imageContainer = document.createElement('div');
		imageContainer.classList.add(`image-container`);
		this.shadowRoot?.appendChild(imageContainer);

		// Mostrar las imágenes en la página
		postData.forEach((post: any) => {
			console.log(post); // verificar

			const card = this.ownerDocument.createElement('profile-grid') as profileGrid;
			card.setAttribute(profileGridAttribute.img, post.img);
			card.setAttribute(profileGridAttribute.img1, post.img1);
			card.setAttribute(profileGridAttribute.img2, post.img2);
			imageContainer.appendChild(card);
		});
		const menuPhone = document.createElement('menu-phone') as MenuFeed;
		this.shadowRoot?.appendChild(menuPhone);
	}
}

customElements.define('profile-screen', Profile);
