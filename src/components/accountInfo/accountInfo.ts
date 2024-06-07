import indexStyle from "./accountinfo.css";

// para Cambio de pantalla
import { dispatch } from "../../store/index";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";

export enum Attribute {
  "user" = "user",
}

class accountInfo extends HTMLElement {
  user?: string;

  static get observedAttributes() {
    const attrs: Record<Attribute, null> = {
      user: null,
    };
    return Object.keys(attrs);
  }

  attributeChangedCallback(
    propName: Attribute,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    switch (propName) {
      default:
        this[propName] = newValue;
        break;
    }
    this.render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
        <p>By creating an account, you agree to the Raw <a href="url" class="user-link">Terms of Service</a> and <a href="url" class="user-link">Privacy Policy</a></p>
        <p>Already have an account? <a href="#" class="user-link" id="loginLink">Log In</a></p>
      `;

      // Obtén el enlace "Log In" y agrega un evento click
      const loginLink = this.shadowRoot.querySelector("#loginLink");
      if (loginLink) {
        loginLink.addEventListener("click", () => {
          // Cambia a la pantalla de inicio de sesión
          dispatch(navigate(Screens.LOGIN)); // Asegúrate de importar Screens desde tu código
        });
      }
    }
  }
}

customElements.define("account-info", accountInfo);
export default accountInfo;
