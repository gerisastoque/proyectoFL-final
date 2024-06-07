import indexstyles from "./createAccount.css";

import createForm, {
  Attribute as createFormAttribute,
} from "../../components/createAccount-form/createAccount-form";
import lowerMenu, {
  Attribute as lowerMenuAttribute,
} from "../../components/lower-menu/lower-menu";
import { saveUser } from "../../utils/firebase"; // Corregir la importación aquí

// para Cambio de pantalla
import { dispatch } from "../../store/index";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";

class CreateAccount extends HTMLElement {
  createFormElement: createForm | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    if (this.shadowRoot) this.shadowRoot.innerHTML = ``;

    const styleElement = document.createElement("style");
    styleElement.textContent = indexstyles;
    this.shadowRoot?.appendChild(styleElement);

    this.createFormElement = this.ownerDocument.createElement(
      "create-form"
    ) as createForm;
    this.createFormElement.setAttribute(createFormAttribute.user, "@a.miller");
    this.shadowRoot?.appendChild(this.createFormElement);

    const Button = this.ownerDocument.createElement("button");
    Button.innerText = "Create Account";
    this.shadowRoot?.appendChild(Button);

    Button.addEventListener("click", async () => {
      if (this.createFormElement) {
        const nameInput = this.createFormElement.getNameInput();
        const emailInput = this.createFormElement.getEmailInput();
        const passwordInput = this.createFormElement.getPasswordInput();
        const reenterPasswordInput =
          this.createFormElement.getReenterPasswordInput();

        if (nameInput && emailInput && passwordInput) {
          const name = nameInput.value;
          const email = emailInput.value;
          const password = passwordInput.value;

          if (email.trim() !== "" && name.trim() !== "") {
            saveUser(name, email, password);
            dispatch(navigate(Screens.DASHBOARD));
            console.log("Usuario registrado exitosamente");
          } else {
            alert("Por favor, ingrese datos válidos.");
          }
        } else {
          console.error("Error al obtener los inputs del formulario.");
        }
      }
    });

    const accountInfo = this.ownerDocument.createElement("account-info");
    this.shadowRoot?.appendChild(accountInfo);

    const lowerMenuElement = this.ownerDocument.createElement(
      "lower-menu"
    ) as createForm;
    lowerMenuElement.setAttribute(lowerMenuAttribute.user, "@a.miller");
    this.shadowRoot?.appendChild(lowerMenuElement);
  }
}

customElements.define("create-account", CreateAccount);
