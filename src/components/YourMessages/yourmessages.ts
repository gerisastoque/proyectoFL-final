import messagesstyles from "./yourmessages.css";

class YourMessages extends HTMLElement {
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
      ${messagesstyles}
    </style>

    <section>
      <img src="img/messagesIcono.png">
      
      <h1>Your messages</h1>
      <p>Send photos and private messages to a friend or a group </p>
      <button>Send message</button>
    </section>
    `;
    }
  }
}
customElements.define("your-messages", YourMessages);
export default YourMessages;
