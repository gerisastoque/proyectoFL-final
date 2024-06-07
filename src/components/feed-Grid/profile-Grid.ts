import poststyles from "./profile-Grid.css";

export enum Attribute {
  "img" = "img",
  "img1" = "img1",
  "img2" = "img2",
}

class profileGrid extends HTMLElement {
  img?: string;
  img1?: string;
  img2?: string;

  static get observedAttributes() {
    const attrs: Record<Attribute, null> = {
      img: null,
      img1: null,
      img2: null,
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

      <section class="grid-container">
        <section class="photo-container"><img src="${this.img}"></section>
        <section class="photo-container"><img src="${this.img1}"></section>
        <section class="photo-container"><img src="${this.img2}"></section>
      </section>
          
      `;
    }
  }
}

customElements.define("profile-grid", profileGrid);
export default profileGrid;
