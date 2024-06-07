import messagestyles from "./message.css";

export enum Attribute {
  "user" = "user",
  "message" = "message",
  "img" = "img",
  "time" = "time",
}

class MessageCard extends HTMLElement {
  user?: string;
  message?: string;
  img?: string;
  time?: string;

  static get observedAttributes() {
    const attrs: Record<Attribute, null> = {
      user: null,
      message: null,
      img: null,
      time: null,
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
              ${messagestyles}
            </style>
          
            <section class="container">
            <section class="roundComponents">
            <img class="imgprofiles" src="${this.img}">
            </section>

            <section class="container-message">
              <section class="userMessage">
                <div class="user">
                  <h1>${this.user}</h1>
                </div>
            
                <div class="message">
                  <p>${this.message}</p>
                  <p>${this.time}</p>
                </div>
              </section>
            </section>
            
        `;
    }
  }
}

customElements.define("message-card", MessageCard);
export default MessageCard;
