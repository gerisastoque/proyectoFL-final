import notificationStyle from './notificationmonth.css';

class NotificationMonth extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
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
             <img class="userimg" src="/img/imgNotification.png">
             <section class="general">
                    <div class="user">
                      <h3>A m.lerma and others </h3>
                      </div>
                    <section class="messageXtime">
                    <div class="message">
                      <p>liked your post. 1 week</p>
                      </div>
                      </section>
          <section class="publicationContainer">
          <img class="publication" src="https://i.pinimg.com/736x/96/18/57/9618575d1e790be40cbd79785f905021.jpg"<section></img>
          </section>
          </section>

    `;
	}
}

customElements.define('notification-month', NotificationMonth);
export default NotificationMonth;
