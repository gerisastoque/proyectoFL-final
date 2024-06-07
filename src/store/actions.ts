import {
    Actions
	NavigateAction,
	NavigationActions,
	Screens,
	PostDataActions,
    TweetDataActions,
	GetTweetAction,
	AddPostAction,
	AddTweetAction,

} from '../types/store';
import firebase from '../utils/firebase';
import { getmain } from '../utils/firebase';

export const navigate = (screen: Screens): NavigateAction => {
	return {
		action: NavigationActions.NAVIGATE,
		payload: screen,
	};
};

//pots

// export const getPosts = async (): Promise<GetPostAction> => {
// const posts = await firebase.getmain()
// 	 return {
// 	action: PostDataActions.GET,
// 	payload: posts,
// 	 };
// };

// export const addNewPost = async ({ payload }: Pick<AddPostAction, 'payload'>): Promise<Actions> => {
//  await firebase.addmain(payload);
//  return {
//      action: PostDataActions.ADD,
//      payload
//     }
// };

//tweet

// export const getTweets = async (): Promise<GetTweetAction> => {
// const tweets = await  firebase.getTweet()
//  return {
// 	action: TweetDataActions.GET,
// 	payload: tweets,
// 	}
// };

// export const addNewTweet = async ({ payload }: Pick<AddTweetAction, 'payload'>): Promise<Actions> => {
// await firebase.addtweet(payload);
//  return {
// 	action: TweetDataActions.ADD,
// 	 payload
// 	}
// };

export const setUserCredentials = (user: string):any => {
	return {
		type:"SETUSER",
		payload: user,
	};
};