import indexStyle from './account-Settings.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
	'user' = 'user',
}

class accountSettings extends HTMLElement {
	user?: string;

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
			this.shadowRoot.innerHTML = `
      <style>
        ${indexStyle}
      </style>

        <h1>
            Account Settings
        </h1>

        <form>

        <div class="input-container">
            <label for="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder=" Vanessa Rodriguez ">
            <p class="input-description">
              To help people discover your account, use the name people know you by, whether it's your full name, nickname, or business name. You can only change the name twice within a 14-day period.
            </p>
          </div>

          <div class="input-container">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder=" Vanessa ">
            <p class="input-description">
              In most cases, you will be able to change your username back to amiller for 14 more days.
            </p>
          </div>

          <div class="input-container">
            <label for="description">Description</label>
            <input type="text" id="description" name="description" placeholder="At least 12 characters.">
                </div>

          <div class="input-container">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="example@email.com">
          </div>

          <div class="input-container">
            <label for="phone">Cellphone Number</label>
            <input class="phonenumber-input" type="text" id="phone" name="phone" placeholder="At least 10 characters">
          </div>


        </form>

      `;

			const containerButton = this.ownerDocument.createElement('div');
			containerButton.classList.add('button-container');

			const changePasswordButton = this.ownerDocument.createElement('button');
			changePasswordButton.type = 'button';
			changePasswordButton.classList.add('change-password-button');
			changePasswordButton.textContent = 'Change Password';
			containerButton.appendChild(changePasswordButton);
			changePasswordButton.addEventListener('click', () => {
				dispatch(navigate(Screens.PASSWORD));
			});

			const saveChangesButton = this.ownerDocument.createElement('button');
			saveChangesButton.type = 'submit';
			saveChangesButton.classList.add('save-changes-button');
			saveChangesButton.textContent = 'Save Changes';
			containerButton.appendChild(saveChangesButton);
			saveChangesButton.addEventListener('click', () => {
				dispatch(navigate(Screens.USER_PROFILE));
			});

			const cancelButton = this.ownerDocument.createElement('button');
			cancelButton.type = 'button';
			cancelButton.classList.add('cancel-button');
			cancelButton.textContent = 'Cancel';
			containerButton.appendChild(cancelButton);
			cancelButton.addEventListener('click', () => {
				dispatch(navigate(Screens.USER_PROFILE));
			});

			this.shadowRoot?.appendChild(containerButton);
		}
	}
}

customElements.define('account-settings', accountSettings);
export default accountSettings;
