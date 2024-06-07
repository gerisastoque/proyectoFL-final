import notificationStyle from "./notification.css";

export enum Attribute {
  "username" = "username",
  "img" = "img",
  "notificationtype" = "notificationtype",
  "time" = "time",
}

export default class NotificationCard extends HTMLElement {
  username?: string;
  img?: string;
  notificationtype?: string;
  time?: string;

  static get observedAttributes() {
    const attrs: Record<Attribute, null> = {
      username: null,
      img: null,
      notificationtype: null,
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
    if (this.shadowRoot)
      this.shadowRoot.innerHTML = ` 
    <style>
        ${notificationStyle}
    </style>
   
    <section class="container">
         <img class="userimg" src="${this.img}">
         <section class="general">
                <div class="user">
                  <h3>${this.username}</h3>
                  </div>
                <section class="messageXtime">
                <div class="message">
                  <p>${this.notificationtype}</p>
                  </div>
                <div class="time">
                  <p>${this.time}</p>
                  </div>
                  </section>
      <section class="publicationContainer">
      <img class="publication" src="https://i.pinimg.com/1200x/ed/1c/20/ed1c208e3ba9b32431eb62c1ba367759.jpg"<section></img>
      </section>
      </section>
    `;
  }
}

customElements.define("notification-card", NotificationCard);
