import indexstyles from "./createAccount.css";

import accountSettings, {
  Attribute as accountSettingsAttribute,
} from "../../components/account-Settings/account-Settings";
import lowerMenu, {
  Attribute as lowerMenuAttribute,
} from "../../components/lower-menu/lower-menu";

class settings extends HTMLElement {
  message: accountSettings[] = [];

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
    const accountSettings = this.ownerDocument.createElement(
      "account-settings"
    ) as accountSettings;
    accountSettings.setAttribute(accountSettingsAttribute.user, "@a.miller");
    this.shadowRoot?.appendChild(accountSettings);

    const lowerMenu = this.ownerDocument.createElement(
      "lower-menu"
    ) as lowerMenu;
    lowerMenu.setAttribute(lowerMenuAttribute.user, "@a.miller");
    this.shadowRoot?.appendChild(lowerMenu);
  }
}

customElements.define("settings-screen", settings);
