import indexStyle from './change-password.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
	'user' = 'user',
}

class changePassword extends HTMLElement {
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

        <form>

          <label for="password">New Password</label>
          <input type="password" id="password" name="password" placeholder= "At least 8 characters" required><br><br>

          <label for="reenter-password">Re-enter New Password</label>
          <input type="password" id="reenter-password" name="reenter-password" placeholder= "At least 8 characters" required><br><br>

        </form>
      `;

			const containerButton = this.ownerDocument.createElement('div');
			containerButton.classList.add('button-container');

			const changePasswordButton = this.ownerDocument.createElement('button');
			changePasswordButton.type = 'button';
			changePasswordButton.classList.add('change-password-button');
			changePasswordButton.textContent = 'Change My Password';
			containerButton.appendChild(changePasswordButton);
			changePasswordButton.addEventListener('click', () => {
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

customElements.define('change-password', changePassword);
export default changePassword;
