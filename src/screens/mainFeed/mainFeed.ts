import IndexStyle from './mainFeed.css';
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');
const { getAuth } = require('firebase/auth');
import MenuCard, { Attribute as MenuCardAttribute } from '../../components/menu-Card/menu-Card';
import TweetCard, { Attribute as TweetCardAttribute } from '../../components/tweet-Card/tweet-Card';
import PostCard, { Attribute as PostCardCardAttribute } from '../../components/post-Card/post-Card';
import ImgCard, { Attribute as ImgCardAttribute } from '../../components/main-ImgCard/main-ImgCard';
import indexstyles from './mainFeed.css';
import { MenuFeed, CreatePostButton, tweetCard } from '../../components/export';
//para firebase
import firebase from '../../utils/firebase';
import { getTweet } from '../../utils/firebase';
import { Tweet } from '../../types/Tweet';
import { post } from '../../types/post';
import { getmain } from '../../utils/firebase';
import { getDoc, collection } from 'firebase/firestore';
import { appState, dispatch } from '../../store';

//parametros tweet

const dataTweet: Omit<Tweet, 'id'> = {
	username: '',
	image: '',
	description: '',
};

//parametros main.imgCard

const datamain: Omit<post, 'id'> = {
	image: '',
	isLiked: false,
	isSaved: false,
	likescount: '',
	username: '',
	description: '',
};

//Para Firebase

let datapost: any = null;
let datatweet: any = null;

class MainFeed extends HTMLElement {
	tweets: TweetCard[] = [];
	post: ImgCard[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		console.log(appState);

		const action = await getmain();
		console.log(action);

		const actiontweet = await getTweet();

		datatweet = actiontweet;
		datapost = action;

		this.render();

		// Obtén los botones dentro del shadowRoot
		const likeBtn = this.shadowRoot?.querySelector('#likeBtn');
		const saveBtn = this.shadowRoot?.querySelector('#saveBtn');

		// Agrega listeners de eventos solo si los botones existen
		likeBtn?.addEventListener('click', datapost.changeLike.bind(datapost));
		saveBtn?.addEventListener('click', datapost.changeSaved.bind(datapost));
	}

	// valores main
	changecaption(e: any) {
		datamain.image = e.target.value;
	}
	changeMainuser(e: any) {
		datamain.username = e.target.value;
	}
	changelikes(e: any) {
		datamain.isLiked = e.target.value;
	}
	changesave(e: any) {
		datamain.isSaved = e.target.value;
	}

	changecount(e: any) {
		datamain.likescount = e.target.value;
	}

	changedescription(e: any) {
		datamain.description = e.target.value;
	}

	//valores  tweet
	changeimg(e: any) {
		dataTweet.image = e.target.value;
	}
	changeuser(e: any) {
		dataTweet.username = e.target.value;
	}
	changedescriptiontwweet(e: any) {
		dataTweet.description = e.target.value;
	}

	async render() {
		const styleElement = document.createElement('style');
		styleElement.textContent = IndexStyle;
		this.shadowRoot?.appendChild(styleElement);

		const menucard = this.ownerDocument.createElement('menu-card') as MenuCard;
		menucard.setAttribute(MenuCardAttribute.user, '@a.miller');
		this.shadowRoot?.appendChild(menucard);

		const menuPhone = document.createElement('menu-phone') as MenuFeed;
		this.shadowRoot?.appendChild(menuPhone);
		const createPost = document.createElement('create-post-button') as CreatePostButton;
		this.shadowRoot?.appendChild(createPost);

		const containerGeneral = this.ownerDocument.createElement('section');
		containerGeneral.classList.add('containerGeneral');
		this.shadowRoot?.appendChild(containerGeneral);

		const generalContainer = document.createElement('section');
		generalContainer.classList.add('container-post');
		containerGeneral.appendChild(generalContainer);

		for (let i = 0; i < datapost.length; i++) {
			let corazon = '../../img/emptyHeart.png';
			if (datapost[i].isLiked) {
				corazon = '../../img/heart.png';
			}

			let save = '../../img/emptySave.png';
			if (datapost[i].isSaved) {
				save = '../../img/save.png';
			}

			// Crear los elementos
			const section = document.createElement('section');
			section.classList.add('container');

			const imgContainer = document.createElement('div');
			imgContainer.classList.add('imgContainer');

			const img = document.createElement('img');
			img.classList.add('img');
			img.setAttribute('src', datapost[i].image);
			img.setAttribute('alt', 'Post image');

			const userContent = document.createElement('div');
			userContent.classList.add('userContent');

			const iconContainer = document.createElement('div');
			iconContainer.classList.add('iconContainer');

			const likeBtn = document.createElement('img');
			likeBtn.classList.add('icon');
			likeBtn.setAttribute('src', datapost[i].isLiked);
			likeBtn.setAttribute('alt', 'Like icon');
			likeBtn.setAttribute('id', 'likeBtn');

			const saveBtn = document.createElement('img');
			saveBtn.classList.add('icon');
			saveBtn.setAttribute('src', datapost[i].isSaved);
			saveBtn.setAttribute('alt', 'Save icon');
			saveBtn.setAttribute('id', 'saveBtn');

			const likes = document.createElement('p');
			likes.classList.add('likes');
			likes.textContent = `${datapost[i].likescount} likes`;

			const usernameSpan = document.createElement('span');
			usernameSpan.classList.add('username');
			usernameSpan.textContent = datapost[i].username;

			const descriptionSpan = document.createElement('span');
			descriptionSpan.classList.add('description');
			descriptionSpan.textContent = datapost[i].description;

			// Construir la estructura de los elementos
			section.appendChild(imgContainer);
			imgContainer.appendChild(img);
			section.appendChild(userContent);
			userContent.appendChild(iconContainer);
			iconContainer.appendChild(likeBtn);
			iconContainer.appendChild(saveBtn);
			userContent.appendChild(likes);
			userContent.appendChild(document.createElement('br')); // Para agregar un salto de línea
			userContent.appendChild(usernameSpan);
			userContent.appendChild(document.createTextNode(': ')); // Texto estático ':' entre el nombre de usuario y la descripción
			usernameSpan.appendChild(descriptionSpan);

			// Añadir la sección al DOM
			document.body.appendChild(section);

			generalContainer?.appendChild(section);

			console.log('holaaa', datapost[i].username);
		}

		try {
			const tweetData = await getTweet();
			console.log(tweetData);

			const postData = await getmain(); // Obtener datos de post
			console.log(postData);

			const generalContainer2 = document.createElement('section');
			generalContainer2.classList.add('container-tweet');
			containerGeneral.appendChild(generalContainer2);

			for (let i = 0; i < datatweet.length; i++) {
				const section2 = document.createElement('section');
				section2.classList.add('container2');

				const tweetAndImg = document.createElement('div');
				tweetAndImg.classList.add('tweetandimg');

				const tweet = document.createElement('div');
				tweet.classList.add('tweet');

				const description2 = document.createElement('p');
				description2.classList.add('description2');
				description2.textContent = datatweet[i].description;

				const imgDiv = document.createElement('div');
				imgDiv.classList.add('img2');

				const imgContainer2 = document.createElement('div');
				imgContainer2.classList.add('img-container2');

				const imgPost2 = document.createElement('img');
				imgPost2.classList.add('img-post2');
				imgPost2.setAttribute('src', datatweet[i].image);
				imgPost2.setAttribute('alt', 'Post image');

				const infoUser2 = document.createElement('div');
				infoUser2.classList.add('infoUser2');

				const username2 = document.createElement('p');
				username2.classList.add('username2');
				username2.textContent = datatweet[i].username;

				// Construir la estructura de los elementos
				section2.appendChild(tweetAndImg);
				tweetAndImg.appendChild(tweet);
				tweet.appendChild(description2);
				tweetAndImg.appendChild(imgDiv);
				imgDiv.appendChild(imgContainer2);
				imgContainer2.appendChild(imgPost2);
				section2.appendChild(infoUser2);
				infoUser2.appendChild(username2);

				// Añadir la sección al DOM
				generalContainer2.appendChild(section2);
			}
		} catch (error) {
			console.error('Error al obtener datos de tweet:', error);
		}

		try {
			const postData = await getmain();
			console.log(postData);

			// Lógica similar para el manejo de datos de post
		} catch (error) {
			console.error('Error al obtener datos de post:', error);
		}
	}
}

customElements.define('main-feed', MainFeed);
