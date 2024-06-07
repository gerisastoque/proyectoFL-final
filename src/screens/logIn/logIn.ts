import indexstyles from './logIn.css';
import LoginForm from '../../components/logInComponent/logInComponent';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { getUsers } from '../../utils/firebase';

import lowerMenu, { Attribute as lowerMenuAttribute } from '../../components/lower-menu/lower-menu';

class LoginScreen extends HTMLElement {
	private loginFormElement: LoginForm | null = null;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	private async handleLoginButtonClick() {
		if (!this.loginFormElement) {
			console.error('Error: LoginForm element not found.');
			return;
		}

		const emailInput = this.loginFormElement.getEmailInput();
		const passwordInput = this.loginFormElement.getPasswordInput();

		if (emailInput && passwordInput) {
			const email = emailInput.value.trim();
			const password = passwordInput.value;

			try {
				const user = await getUsers(email, password);
				if (user) {
					dispatch(navigate(Screens.DASHBOARD));
				} else {
					console.error('Error al obtener el usuario');
				}
			} catch (error) {
				console.error('Error al iniciar sesión:', error);
			}
		} else {
			console.error('Error al obtener los inputs del formulario de inicio de sesión.');
		}
	}

	private handleSignUpLinkClick() {
		dispatch(navigate(Screens.CREATEACCOUNT)); // Cambiar a la pantalla correcta
	}

	private render() {
		if (this.shadowRoot) {
			const styleElement = document.createElement('style');
			styleElement.textContent = indexstyles;
			this.shadowRoot.appendChild(styleElement);

			// Componente de formulario de inicio de sesión
			this.loginFormElement = this.ownerDocument.createElement('login-form') as LoginForm;
			this.shadowRoot.appendChild(this.loginFormElement);

			// Contenedor para centrar el botón
			const btnContainer = this.ownerDocument.createElement('div');
			btnContainer.classList.add('btn-container');

			// Botón para iniciar sesión
			const button = this.ownerDocument.createElement('button');
			button.classList.add('btnContinue');
			button.textContent = `Continue`;
			button.addEventListener('click', () => this.handleLoginButtonClick());

			btnContainer.appendChild(button);
			this.shadowRoot.appendChild(btnContainer);

			// Código para el enlace "Sign Up"
			const signUpLink = this.ownerDocument.createElement('a');
			signUpLink.href = '#'; // Cambiar "url" con la URL correcta
			signUpLink.textContent = 'Sign Up';
			signUpLink.classList.add('user-link');
			signUpLink.addEventListener('click', () => this.handleSignUpLinkClick());

			// Párrafo "Don't have an account"
			const signUpParagraph = this.ownerDocument.createElement('p');
			signUpParagraph.textContent = "Don't have an account ";
			signUpParagraph.appendChild(signUpLink);

			// Nuevo párrafo "By creating an account..."
			const termsParagraph = this.ownerDocument.createElement('p');
			termsParagraph.innerHTML =
				'By creating an account, you agree to the Raw <a href="url" class="user-link">Terms of Service</a> and <a href="url" class="user-link">Privacy Policy</a>';

			// Agregar párrafos al shadowRoot
			this.shadowRoot.appendChild(termsParagraph);
			this.shadowRoot.appendChild(signUpParagraph);

			const lowerMenuElement = this.ownerDocument.createElement('lower-menu');
			this.shadowRoot?.appendChild(lowerMenuElement);
		}
	}
}

customElements.define('login-screen', LoginScreen);
