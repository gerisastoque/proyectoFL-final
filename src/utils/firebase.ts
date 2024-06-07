import { collection, addDoc, getDocs, where, setDoc, getFirestore, onSnapshot, query, doc } from 'firebase/firestore';
import { firebaseConfig } from '../services/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';

//Types
import { FeedGrid } from '../types/FeedGrid';
import { Notifications } from '../types/notificationType';
import { SearchTypes } from '../types/searchtypes';
import { initializeApp } from '@firebase/app';
import { Tweet } from '../types/Tweet';
import { post } from '../types/post';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const storage = getStorage(app);
export const auth = getAuth(app);

//Auth
export const saveUser = async (name: any, email: any, password: any) => {
	const auth = getAuth();
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			setDoc(doc(db, 'users', name), {
				name: name,
				email: email,
			});
		})
		.catch((error) => {
			console.error('Error al crear usuario:', error.code, error.message);
		});
};

export const getUsers = async (email: any, password: any) => {
	const auth = getAuth();
	signInWithEmailAndPassword(auth, email, password);
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		console.log('se inicio sesion', user);
		return user; // Devuelve el usuario si la autenticación es exitosa
	} catch (error) {
		alert('correo electronico o contraseña invalidos, por favor intentalo de nuevo');
		console.log(`Error al iniciar sesión`, error);
	}
};
//FinAuth

// para tweets
export const addtweet = async (product: Omit<Tweet, 'id'>) => {
	try {
		const where = collection(db, 'tweets');
		await addDoc(where, product);
		console.log('se añadió con éxito');
	} catch (error) {
		console.error(error);
	}
};

export const getTweet = async () => {
	const querySnapshot = await getDocs(collection(db, 'tweets'));
	const transformed: Array<Tweet> = [];

	querySnapshot.forEach((doc) => {
		const data: Omit<Tweet, 'id'> = doc.data() as any;
		transformed.push({ id: doc.id, ...data });
	});

	return transformed;
};

const getTweetListener = (cb: (docs: Tweet[]) => void) => {
	const ref = collection(db, 'products');

	onSnapshot(ref, (collection) => {
		const docs: Tweet[] = collection.docs.map((doc: any) => ({
			id: doc.id,
			...doc.data(),
		})) as Tweet[];
		cb(docs);
	});
};
//Fin Tweets

// para main-ImgCards

export const addmain = async (product: Omit<post, 'id'>) => {
	try {
		const where = collection(db, 'posts');
		await addDoc(where, product);
		console.log('se añadió con éxito');
	} catch (error) {
		console.error(error);
	}
};

export const getmain = async () => {
	const querySnapshot = await getDocs(collection(db, 'posts'));
	const transformed: Array<post> = [];

	querySnapshot.forEach((doc) => {
		console.log(`${doc.id} => ${doc.data()}`);
		const data: Omit<post, 'id'> = doc.data() as any;
		transformed.push({ id: doc.id, ...data });
	});

	console.log(querySnapshot);

	return transformed;
};

const getMainListener = (cb: (docs: post[]) => void) => {
	const ref = collection(db, 'products');

	onSnapshot(ref, (collection) => {
		const docs: post[] = collection.docs.map((doc: any) => ({
			id: doc.id,
			...doc.data(),
		})) as post[];
		cb(docs);
	});
};
//Fin ImgCards

//FeedGrid
export const addFeedGrid = async (product: Omit<FeedGrid, 'id'>) => {
	try {
		const where = collection(db, 'FeedGrid');
		await addDoc(where, product);
		console.log('se añadió con éxito');
	} catch (error) {
		console.error(error);
	}
};

export const getFeedGrid = async () => {
	const querySnapshot = await getDocs(collection(db, 'FeedGrid'));
	const transformed: Array<FeedGrid> = [];

	querySnapshot.forEach((doc) => {
		const data: Omit<FeedGrid, 'id'> = doc.data() as any;
		transformed.push({ id: doc.id, ...data });
	});

	return transformed;
};

const getFeedGridlistener = (cb: (docs: FeedGrid[]) => void) => {
	const ref = collection(db, 'FeedGrid');

	onSnapshot(ref, (collection) => {
		const docs: FeedGrid[] = collection.docs.map((doc: any) => ({
			id: doc.id,
			...doc.data(),
		})) as FeedGrid[];
		cb(docs);
	});
};
//Fin FeedGrid

//Para Notifications
export const addNotifications = async (product: Omit<Notifications, 'id'>) => {
	try {
		const where = collection(db, 'Notifications');
		await addDoc(where, product);
		console.log('se añadió con éxito');
	} catch (error) {
		console.error(error);
	}
};

export const getNotifications = async () => {
	const querySnapshot = await getDocs(collection(db, 'Notifications'));
	const transformed: Array<Notifications> = [];

	querySnapshot.forEach((doc) => {
		const data: Omit<Notifications, 'id'> = doc.data() as any;
		transformed.push({ id: doc.id, ...data });
	});

	return transformed;
};

const getNotificationslistener = (cb: (docs: Notifications[]) => void) => {
	const ref = collection(db, 'Notifications');

	onSnapshot(ref, (collection) => {
		const docs: Notifications[] = collection.docs.map((doc: any) => ({
			id: doc.id,
			...doc.data(),
		})) as Notifications[];
		cb(docs);
	});
};
//Fin Notifications

//Search
export const addSearchTypes = async (product: Omit<SearchTypes, 'id'>) => {
	try {
		const where = collection(db, 'Search');
		await addDoc(where, product);
		console.log('se añadió con éxito');
	} catch (error) {
		console.error(error);
	}
};

export const getSearchTypes = async () => {
	const querySnapshot = await getDocs(collection(db, 'Search'));
	const transformed: Array<SearchTypes> = [];

	querySnapshot.forEach((doc) => {
		const data: Omit<SearchTypes, 'id'> = doc.data() as any;
		transformed.push({ id: doc.id, ...data });
	});

	return transformed;
};

const getSearchTypeslistener = (cb: (docs: SearchTypes[]) => void) => {
	const ref = collection(db, 'SearchTypes');

	onSnapshot(ref, (collection) => {
		const docs: SearchTypes[] = collection.docs.map((doc: any) => ({
			id: doc.id,
			...doc.data(),
		})) as SearchTypes[];
		cb(docs);
	});
};
//Fin Search

//Create Account
// const CreateAccount = async (name: string, email: string, password: string) => {
//   try {
//     // Validar el formato del correo electrónico
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       console.error("Correo electrónico no válido");
//       return;
//     }

//     // Primer paso: Crear usuario con auth
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     console.log(user.uid);

//     // Segundo paso: Crear datos del usuario en la colección users
//     const userDocRef = doc(db, "users", user.uid);
//     const userData = {
//       name: name,
//       email: email,
//     };

//     await setDoc(userDocRef, userData);

//     console.log("Se añadió");
//   } catch (error) {
//     console.error(error);
//   }
// };

//LogIn
// const logIn = (email: string, password: string) => {
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       console.log(user.uid);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error(errorMessage);
//     });
// };

export default {
	//   CreateAccount,
	//   logIn,
	saveUser,
	addtweet,
	getTweet,
	getTweetListener,
	addmain,
	getmain,
	getMainListener,
	addFeedGrid,
	getFeedGrid,
	getFeedGridlistener,
	addNotifications,
	getNotifications,
	getNotificationslistener,
	addSearchTypes,
	getSearchTypes,
	getSearchTypeslistener,
};
