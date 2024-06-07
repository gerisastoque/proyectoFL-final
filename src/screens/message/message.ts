import MenuCard, {
  Attribute as MenuCardAttribute,
} from "../../components/menu-Card/menu-Card";
import indexstyles from "./message.css";
import { MenuNotification } from "../../components/export";
import MessageCard, {
  Attribute as MessageCardAttribute,
} from "../../components/message/messageC";

// para firebase 
import firebase from "../../utils/firebase"; 
import {getmessage}from "../../utils/firebase"
import { Message } from "../../types/Messages";

//parametros 
const formData: Omit<Message, "id"> = {
  user: "",
  img: "",
  time: "",
  message: "",
};



class Messages extends HTMLElement {
  message: MessageCard[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

 

  connectedCallback() {
    this.render();
  }
  
//valores 

  changeimg(e: any) {
    formData.img = e.target.value; }
    changeuser(e: any) {
      formData.user = e.target.value; }
    changemessage(e: any) {
      formData.message = e.target.value; }
    changetime(e: any) {
      formData.time = e.target.value; }

  async render() {


    //para firebase 
    try {
      const postData = await getmessage();
      console.log(postData);

      if (this.shadowRoot) this.shadowRoot.innerHTML = ``;
      const styleElement = document.createElement("style");
      styleElement.textContent = indexstyles;
      this.shadowRoot?.appendChild(styleElement);



      
    const menucard = this.ownerDocument.createElement("menu-card") as MenuCard;
    menucard.setAttribute(MenuCardAttribute.user, "@a.miller");
    this.shadowRoot?.appendChild(menucard);

    const search = this.ownerDocument.createElement("search-component");
    this.shadowRoot?.appendChild(search);

    const title = document.createElement("h3");
    title.textContent = "Messages";
    title.classList.add("title");
    this.shadowRoot?.appendChild(title);

      // Obtener los datos de los posts desde Firebase
      const posts = await firebase.getmessage();
      

      // Crear contenedor para las imágenes de los posts
      const imageContainer = document.createElement("div");
      imageContainer.classList.add(`image-container`);
      this.shadowRoot?.appendChild(imageContainer);

      // Mostrar las imágenes en la página
      postData.forEach((post: any) => {
        console.log(post); // Agrega esta línea para verificar si hay datos en post
        const card = this.ownerDocument.createElement("message-card") as MessageCard;
        card.setAttribute(MessageCardAttribute.img, post.img);
        card.setAttribute(MessageCardAttribute.user, post.user);
        card.setAttribute(MessageCardAttribute.message, post.message);
        card.setAttribute(MessageCardAttribute.time, post.time);
        // Agregar card al contenedor de mensajes
        this.shadowRoot?.appendChild(card);
        console.log(card)
      });
  
      // const yourmessages = this.ownerDocument.createElement("your-messages");
      // yourmessages.classList.add("yourmessage");
      // this.shadowRoot?.appendChild(yourmessages);

      const menumessage = document.createElement("menu-message") as MenuNotification;
      this.shadowRoot?.appendChild(menumessage);
    } catch (error) {
      console.error(error);
    }

    
  }
}

customElements.define("messages-screen", Messages);
