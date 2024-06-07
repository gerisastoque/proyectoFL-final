import './screens/mainFeed/mainFeed';
import indexStyle from './index.css';

import './screens/profile/profile';
import './screens/search/search';
import './screens/createAccount/createAccount';
import './screens/notifications/notifications';
import './screens/message/message';
import './screens/sharescreen/sharescreen';
import './screens/settings/settings';
import './screens/passwordScreen/passwordScreen';
import './screens/logIn/logIn';

//Para navegation
import { addObserver } from './store/index';
import { appState } from './store/index';
import { Screens } from './types/store';

//import "./components/export"

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
        <section></section>
      `;

			console.log(appState.screen);

			switch (appState.screen) {
				case Screens.CREATEACCOUNT:
					const createAccount = this.ownerDocument.createElement('create-account');
					this.shadowRoot?.appendChild(createAccount);
					break;

				case Screens.LOGIN:
					const login = this.ownerDocument.createElement('login-screen');
					this.shadowRoot?.appendChild(login);
					break;

				case Screens.DASHBOARD:
					const mainScreen = this.ownerDocument.createElement('main-feed');
					this.shadowRoot?.appendChild(mainScreen);
					break;

				case Screens.MESSAGESS:
					const MessagesScreen = this.ownerDocument.createElement('messages-screen');
					MessagesScreen.classList.add('MessagesScreen');
					this.shadowRoot?.appendChild(MessagesScreen);
					break;

				case Screens.NOTIFICATION:
					const notificationScreen = this.ownerDocument.createElement('notification-container');
					notificationScreen.classList.add('notificationScreen');
					this.shadowRoot?.appendChild(notificationScreen);
					break;

				case Screens.SEARCH:
					const Search = this.ownerDocument.createElement('search-screen');
					this.shadowRoot?.appendChild(Search);
					break;

				case Screens.USER_PROFILE:
					const Profile = this.ownerDocument.createElement('profile-screen');
					this.shadowRoot?.appendChild(Profile);
					break;

				case Screens.SETTINGS:
					const settings = this.ownerDocument.createElement('settings-screen');
					this.shadowRoot?.appendChild(settings);
					break;

				case Screens.PASSWORD:
					const passwordScreen = this.ownerDocument.createElement('password-screen');
					this.shadowRoot?.appendChild(passwordScreen);
					break;

				case Screens.SHARESCREEN:
					const sharescreen = this.ownerDocument.createElement('share-screen');
					this.shadowRoot?.appendChild(sharescreen);
					break;

				default:
					break;
			}
		}
	}
}

customElements.define('app-container', AppContainer);
