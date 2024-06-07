import indexstyles from "./createAccount.css";

import MenuCard, {
  Attribute as MenuCardAttribute,
} from "../../components/menu-Card/menu-Card";
import shareItems, {
  Attribute as shareItemsAttribute,
} from "../../components/share-items/share-items";
import userProfile, {
  Attribute as userProfileAttribute,
} from "../../components/userProfile/userProfile";

class sharescreen extends HTMLElement {
  message: MenuCard[] = [];

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

    const menucard = this.ownerDocument.createElement("menu-card") as MenuCard;
    menucard.setAttribute(MenuCardAttribute.user, "@a.miller");
    this.shadowRoot?.appendChild(menucard);

    const Profile = this.ownerDocument.createElement(
      "user-profile"
    ) as userProfile;
    Profile.setAttribute(userProfileAttribute.user, "@a.miller");
    this.shadowRoot?.appendChild(Profile);

    const shareItems = this.ownerDocument.createElement(
      "share-items"
    ) as shareItems;
    shareItems.setAttribute(shareItemsAttribute.user, "@a.miller");
    this.shadowRoot?.appendChild(shareItems);

    
  }
}

customElements.define("share-screen", sharescreen);
