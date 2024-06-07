import poststyles from "./share-items.css";

export enum Attribute {
  "user" = "user",
  "comment" = "comment",
  "img" = "img",
}

class shareItems extends HTMLElement {
  user?: string;
  comment?: string;
  img?: string;

  static get observedAttributes() {
    const attrs: Record<Attribute, null> = {
      user: null,
      comment: null,
      img: null,
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
            ${poststyles}
          </style>
            
          <section class="share-post">
            <section class="userMessage">
              <div class="user">
                <p>${this.user}</p>
              </div>
              <div class="message">
                <h2>Share a post</h2>
              </div>
            </section>

            <section class="roundComponents">
              <div class="plus">
                <img class="imgPlus" src="/img/plus.png">
              </div>
            </section>
          </section>

          <section class="share-tweet">
            <section class="userMessage">
              <div class="user">
                <p>${this.user}</p>
              </div>
              <div class="message">
                <h2>Share a tweet</h2>
              </div>
            </section>

            <section class="roundComponents">
              <div class="plus">
                <img class="imgPlus" src="/img/plus.png">
              </div>
            </section>
          </section>

          <section class="share-audio">
            <section class="userMessage">
              <div class="user">
                <p>${this.user}</p>
              </div>
              <div class="message">
                <h2>Share an audio</h2>
              </div>
            </section>

            <section class="roundComponents">
              <div class="plus">
                <img class="imgPlus" src="/img/plus.png">
              </div>
            </section>
          </section>
      `;
    }
  }
}

customElements.define("share-items", shareItems);
export default shareItems;
