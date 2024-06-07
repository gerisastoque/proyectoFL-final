import indexStyle from './createAccount-form.css';

export enum Attribute {
	'user' = 'user',
}

class CreateForm extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	private render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
        <style>
          ${indexStyle}
        </style>

        <h1>Create an Account</h1>

        <form>
          <label for="name">Your Name</label>
          <input type="text" id="name" name="name" placeholder="First and last name" required><br><br>

          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required><br><br>

          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="At least 8 characters" required><br><br>

          <label for="reenter-password">Re-enter Password:</label>
          <input type="password" id="reenter-password" name="reenter-password" placeholder="At least 8 characters" required><br><br>
        </form>
      `;
		}
	}

	getNameInput(): HTMLInputElement | null {
		return this.shadowRoot?.getElementById('name') as HTMLInputElement | null;
	}

	getEmailInput(): HTMLInputElement | null {
		return this.shadowRoot?.getElementById('email') as HTMLInputElement | null;
	}

	getPasswordInput(): HTMLInputElement | null {
		return this.shadowRoot?.getElementById('password') as HTMLInputElement | null;
	}

	getReenterPasswordInput(): HTMLInputElement | null {
		return this.shadowRoot?.getElementById('reenter-password') as HTMLInputElement | null;
	}
}

customElements.define('create-form', CreateForm);
export default CreateForm;
