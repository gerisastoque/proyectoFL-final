import MenuStyle from './menu-Card.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
	'user' = 'user',
}

class MenuCard extends HTMLElement {
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
			styleElement.textContent = MenuStyle;
			this.shadowRoot?.appendChild(styleElement);

			const container = this.ownerDocument.createElement('nav');
			container.classList.add('menu-bar');

			const containerLogo = this.ownerDocument.createElement('div');
			containerLogo.classList.add('logo');
			container.appendChild(containerLogo);

			const logo = this.ownerDocument.createElement('img');
			logo.src = '/img/logo.png';
			containerLogo.appendChild(logo);
			logo.addEventListener('click', () => {
				dispatch(navigate(Screens.DASHBOARD));
			});

			const icons = this.ownerDocument.createElement('div');
			icons.classList.add('icons');

			const notificationButton = this.ownerDocument.createElement('img');
			notificationButton.src = '/img/icon notifications.png';
			notificationButton.classList.add('icons');
			icons.appendChild(notificationButton);
			notificationButton.addEventListener('click', () => {
				dispatch(navigate(Screens.NOTIFICATION));
			});
			const homeButton = this.ownerDocument.createElement('img');
			homeButton.src = '/img/icon home.png';
			homeButton.classList.add('icons');
			icons.appendChild(homeButton);
			homeButton.addEventListener('click', () => {
				dispatch(navigate(Screens.DASHBOARD));
			});

			const profileButton = this.ownerDocument.createElement('img');
			profileButton.src = '/img/icon profile.png';
			profileButton.classList.add('icons');
			icons.appendChild(profileButton);
			profileButton.addEventListener('click', () => {
				dispatch(navigate(Screens.USER_PROFILE));
			});

			container.appendChild(icons);

			this.shadowRoot?.appendChild(container);
		}
	}
}

customElements.define('menu-card', MenuCard);
export default MenuCard;
