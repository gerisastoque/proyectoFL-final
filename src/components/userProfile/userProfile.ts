import profileStyles from './userProfile.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
	'user' = 'user',
	'name' = 'name',
	'description' = 'description',
}

class UserProfile extends HTMLElement {
	private user?: string;
	private name?: string;
	private description?: string;

	static get observedAttributes() {
		return Object.values(Attribute);
	}

	attributeChangedCallback(propName: Attribute, _oldValue: string | null, newValue: string | null) {
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
			this.shadowRoot.innerHTML = `
        <style>
          ${profileStyles}
        </style>

        <section class="container">
          <img class="user" src="../../../img/icon profile user.png"/>
          <h1 class="user-profile">${this.name || 'Default Name'}</h1>
          <p class="user-at">@${this.user}</p>


        </section>
      `;
			const container = this.ownerDocument.createElement('div');
			container.classList.add('containerButton');
			this.shadowRoot.appendChild(container);

			// Edit Profile Button
			const editProfileButton = this.ownerDocument.createElement('button');
			editProfileButton.textContent = 'Edit Profile';
			editProfileButton.classList.add('button-profile');
			container.appendChild(editProfileButton);
			editProfileButton.addEventListener('click', () => {
				dispatch(navigate(Screens.SETTINGS));
			});

			// Log out Button
			const logoutButton = this.ownerDocument.createElement('button');
			logoutButton.textContent = 'Log out';
			logoutButton.classList.add('btn-logout');
			container.appendChild(logoutButton);
			logoutButton.addEventListener('click', () => {
				dispatch(navigate(Screens.LOGIN));
				//this.logout();
			});

			const containerSwicth = this.ownerDocument.createElement('div');
			containerSwicth.classList.add('swicth');
			this.shadowRoot.appendChild(containerSwicth);
			// Log out Button
			const post = this.ownerDocument.createElement('button');
			post.textContent = 'post';
			post.classList.add('post');
			containerSwicth.appendChild(post);
			post.addEventListener('click', () => {
				dispatch(navigate(Screens.USER_PROFILE));
				//this.logout();
			});

			// Log out Button
			const tweet = this.ownerDocument.createElement('button');
			tweet.textContent = 'x';
			tweet.classList.add('post');
			containerSwicth.appendChild(tweet);
			tweet.addEventListener('click', () => {
				dispatch(navigate(Screens.USER_PROFILE));
				//this.logout();
			});
		}
	}
}

customElements.define('user-profile', UserProfile);
export default UserProfile;
