import indexstyles from "./passwordScreen.css";

import changePassword, {
  Attribute as changePasswordAttribute,
} from "../../components/change-Password/change-password";
import lowerMenu, {
  Attribute as lowerMenuAttribute,
} from "../../components/lower-menu/lower-menu";

class passwordScreen extends HTMLElement {
  message: changePassword[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    console.log(this.message);
  }

  render() {
    if (this.shadowRoot) this.shadowRoot.innerHTML = ``;
    const changePassword = this.ownerDocument.createElement(
      "change-password"
    ) as changePassword;
    changePassword.setAttribute(changePasswordAttribute.user, "@a.miller");
    this.shadowRoot?.appendChild(changePassword);

    const lowerMenu = this.ownerDocument.createElement(
      "lower-menu"
    ) as lowerMenu;
    lowerMenu.setAttribute(lowerMenuAttribute.user, "@a.miller");
    this.shadowRoot?.appendChild(lowerMenu);
  }
}

customElements.define("password-screen", passwordScreen);
