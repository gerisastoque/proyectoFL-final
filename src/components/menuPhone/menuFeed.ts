import menuPhoneStyles from './Menu.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
	'user' = 'user',
}

class MenuFeed extends HTMLElement {
	publication?: string;
	likes?: string;
	user?: string;
	caption?: string;

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			user: null,
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

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;

			const styleElement = document.createElement('style');
			styleElement.textContent = menuPhoneStyles;
			this.shadowRoot?.appendChild(styleElement);

			const containerLogo = this.ownerDocument.createElement('nav');
			containerLogo.classList.add('menuphone-bar');

			const iconsMenu = this.ownerDocument.createElement('div');
			iconsMenu.classList.add('icons-menu');

			const notificationIcon = this.ownerDocument.createElement('img');
			notificationIcon.src = '/img/icon-notifications-menu.png';
			notificationIcon.classList.add('icons-menu', 'img');
			notificationIcon.alt = 'notification';
			iconsMenu.appendChild(notificationIcon);
			notificationIcon.addEventListener('click', () => {
				dispatch(navigate(Screens.NOTIFICATION));
			});

			const homeIcon = this.ownerDocument.createElement('img');
			homeIcon.src = '/img/icon-home-menu.png';
			homeIcon.classList.add('icons-menu', 'img');
			homeIcon.alt = 'home';
			iconsMenu.appendChild(homeIcon);
			homeIcon.addEventListener('click', () => {
				dispatch(navigate(Screens.DASHBOARD));
			});

			const profileIcon = this.ownerDocument.createElement('img');
			profileIcon.src = '/img/icon-profile-menu.png';
			profileIcon.classList.add('icons-menu', 'img');
			profileIcon.alt = 'profile';
			iconsMenu.appendChild(profileIcon);
			profileIcon.addEventListener('click', () => {
				dispatch(navigate(Screens.USER_PROFILE));
			});

			containerLogo.appendChild(iconsMenu);
			this.shadowRoot?.appendChild(containerLogo);
		}
	}
}

customElements.define('menu-phone', MenuFeed);
export default MenuFeed;
