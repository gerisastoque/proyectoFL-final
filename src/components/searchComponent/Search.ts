import searchStyle from "./search.css";

class SearchComponent extends HTMLElement {
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
            ${searchStyle}
        </style>
       
        <section class="container">
          <div class="iconSearch">
            <img class="icon" src="/img/Iconbuscar.png">
            <input type="text" id="search-input" placeholder="Search...">
          </div>
        </section>
    `;
  }
}

customElements.define("search-component", SearchComponent);
export default SearchComponent;
