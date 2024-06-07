import AudioStyles from "./audio-Card.css";

export enum Attribute {
  "img" = "img",
}

class AudioCard extends HTMLElement {
  img?: string;

  static get observedAttributes() {
    const attrs: Record<Attribute, null> = {
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

        <style>${AudioStyles}</style>
      
        `;

const container = this.ownerDocument.createElement('section');
container.classList.add('container');


const audioContainer = this.ownerDocument.createElement('section');
audioContainer.classList.add('audioContainer');


const audioImg = this.ownerDocument.createElement('img');
audioImg.classList.add('audioImg');
audioImg.src = '/img/Audio.png';
const songNameParagraph = this.ownerDocument.createElement('p');
songNameParagraph.classList.add('songName');
songNameParagraph.style.display = 'none';
container.appendChild(songNameParagraph);
audioImg.addEventListener('click', () => {

  songNameParagraph.textContent = 'Flowers-Miley Cryus'; 
  songNameParagraph.style.display = 'block'; 
});

audioContainer.appendChild(audioImg);


const imgContainer = this.ownerDocument.createElement('section');
imgContainer.classList.add('imgContainer');


const imgUser = this.ownerDocument.createElement('img');
imgUser.classList.add('imgUser');
imgUser.src = `${this.img}`;
imgUser.addEventListener('click', () => {

  const modal = this.ownerDocument.createElement('div');
  modal.classList.add('modal');

  
  const enlargedImg = this.ownerDocument.createElement('img');
  enlargedImg.src = `${this.img}`;

  
  modal.appendChild(enlargedImg);

  
  this.shadowRoot?.appendChild(modal);

 
  modal.addEventListener('click', () => {
    this.shadowRoot?.removeChild(modal);
  });
});


imgContainer.appendChild(imgUser);


container.appendChild(audioContainer);
container.appendChild(imgContainer);


this.shadowRoot.appendChild(container);
    }
  }
}

customElements.define("audio-card", AudioCard);
export default AudioCard;