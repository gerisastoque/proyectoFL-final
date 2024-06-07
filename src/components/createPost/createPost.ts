import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import creatPostStyle from './createPost.css';

export enum Attribute {
	'user' = 'user',
}

class CreatePostButton extends HTMLElement {
	user?: string;

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			user: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		if (oldValue !== newValue) {
			this[propName] = newValue;
			this.render();
		}
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
			styleElement.textContent = creatPostStyle;
			this.shadowRoot?.appendChild(styleElement);

			const createButton = this.ownerDocument.createElement('button');
			createButton.id = 'createPostButton';
			createButton.classList.add('create-post-button');
			createButton.textContent = '+';
			createButton.addEventListener('click', () => {
				this.openModal();
			});

			this.shadowRoot?.appendChild(createButton);
		}
	}

	openModal() {
		const modalBackdrop = document.createElement('div');
		modalBackdrop.className = 'modal-backdrop';

		const modal = document.createElement('div');
		modal.className = 'modal';

		modal.innerHTML = `
          <span class="close-modal">&times;</span>
          <div class="modal-content">
              <p class="new-post">New post</p>
              <p class="new-tweet">New tweet</p>
          </div>
      `;

		this.shadowRoot?.appendChild(modalBackdrop);
		this.shadowRoot?.appendChild(modal);

		modalBackdrop.addEventListener('click', () => {
			modalBackdrop.remove();
			modal.remove();
		});

		modal.querySelector('.close-modal')?.addEventListener('click', () => {
			modalBackdrop.remove();
			modal.remove();
		});

		modal.querySelector('.new-post')?.addEventListener('click', () => {
			dispatch(navigate(Screens.USER_PROFILE));
		});

		modal.querySelector('.new-tweet')?.addEventListener('click', () => {
			dispatch(navigate(Screens.USER_PROFILE));
		});
	}
}

customElements.define('create-post-button', CreatePostButton);
export default CreatePostButton;
