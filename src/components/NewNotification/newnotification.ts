
import notificationStyle from "./newNotification.css"

    class Newnotification extends HTMLElement {

    
    constructor() {
      super();
      this.attachShadow({ mode: "open"});
      

    }
  
      
  
    connectedCallback() {
      this.render();
      
    }
  
    render() {
        if (this.shadowRoot)this.shadowRoot.innerHTML = ` 
        <style>
            ${notificationStyle}
        </style>
       
        <section class="container">
             <img class="userimg" src="https://images.squarespace-cdn.com/content/v1/5d796a0dbce54951f877ddbb/1609884947705-DZK475OS60ARY7MKXUOY/IMG_3245.JPG"></img>
             <section class="general">
                    <div class="user">
                      <h3>music_enthusiast</h3>
                      </div>
                    <section class="messageXtime">
                    <div class="message">
                      <p>has commented in your photo</p>
                      </div>
                    <div class="time">
                      <p>30 min</p>
                      </div>
                      </section>
          <section class="publicationContainer">
          <img class="publication" src="https://i.pinimg.com/1200x/ed/1c/20/ed1c208e3ba9b32431eb62c1ba367759.jpg"<section></img>
          </section>
          </section>

    `
    }
  }
  
  customElements.define("notification-new", Newnotification);
  export default Newnotification
  