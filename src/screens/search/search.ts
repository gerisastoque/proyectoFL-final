import indexstyles from "./search.css";

import MenuCard, {
  Attribute as MenuCardAttribute,
} from "../../components/menu-Card/menu-Card";
import { datasearchGrid } from "../../components/search-Grid/datasearch";
import searchGrid, {
  Attribute as searchGridAttribute,
} from "../../components/search-Grid/search-Grid";
import { MenuSearch } from "../../components/export";

// firebase
import firebase from "../../utils/firebase";
import { SearchTypes } from "../../types/searchtypes";
import { getSearchTypes } from "../../utils/firebase";

// parámetros
const formData: Omit<SearchTypes, "id"> = {
  img: "",
  img1: "",
  img2: "",
};

class Search extends HTMLElement {
  message: searchGrid[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    datasearchGrid.forEach((photo) => {
      const searchGrid = this.ownerDocument.createElement(
        "search-grid"
      ) as searchGrid;
      searchGrid.setAttribute(searchGridAttribute.img, photo.img);
      searchGrid.setAttribute(searchGridAttribute.img1, photo.img1);
      searchGrid.setAttribute(searchGridAttribute.img2, photo.img2);
      this.message.push(searchGrid);
    });
  }

  connectedCallback() {
    this.render();
    console.log(this.message);
  }

  // valores

  changeimg(e: any) {
    formData.img = e.target.value;
    formData.img1 = e.target.value;
    formData.img2 = e.target.value;
  }

  async render() {
    if (this.shadowRoot) this.shadowRoot.innerHTML = ``;

    // Agregar MenuProfile

    const menucard = this.ownerDocument.createElement("menu-card") as MenuCard;
    menucard.setAttribute(MenuCardAttribute.user, "@a.miller");
    this.shadowRoot?.appendChild(menucard);

    // Obtener los datos de los posts desde Firebase
    const postData = await getSearchTypes();

    // Crear contenedor para las imágenes de los posts
    const imageContainer = document.createElement("div");
    imageContainer.classList.add(`image-container`);
    this.shadowRoot?.appendChild(imageContainer);

    // Mostrar las imágenes en la página
    postData.forEach((post: any) => {
      console.log(post); // Agrega esta línea para verificar si hay datos en post

      const card = this.ownerDocument.createElement(
        "search-grid"
      ) as searchGrid;
      card.setAttribute(searchGridAttribute.img, post.img);
      card.setAttribute(searchGridAttribute.img1, post.img1);
      card.setAttribute(searchGridAttribute.img2, post.img2);
      imageContainer.appendChild(card);
    });
  }
}

customElements.define("search-screen", Search);
