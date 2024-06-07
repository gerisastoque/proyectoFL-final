export type Observer = { render: () => void } & HTMLElement;
import { Tweet } from './Tweet';
import { post } from './post';

export enum Screens {
	LOGIN = 'LOGIN',
	CREATEACCOUNT = 'CREATEACCOUNT',
	DASHBOARD = 'DASHBOARD',
	MESSAGESS = 'MESSAGESS',
	NOTIFICATION = 'NOTIFICATION',
	SEARCH = 'SEARCH',
	USER_PROFILE = 'USER_PROFILE',
	SETTINGS = 'SETTINGS',
	PASSWORD = 'PASSWORD',
	SHARESCREEN = 'SHARESCREEN',
}
const get = <T>({ key, defaultValue }: { key: Screens; defaultValue: T }): T => {
	const value = localStorage.getItem(key) || sessionStorage.getItem(key);
	return value ? JSON.parse(value) : defaultValue;
};
const set = ({ key, value, session = false }: { key: Screens; value: unknown; session?: boolean }) => {
	const storage = session ? sessionStorage : localStorage;
	const parsed = JSON.stringify(value);
	storage.setItem(key, parsed);
};

export default {
	get,
	set,
};
export type AppState = {
	screen: Screens;
	post: post[];
	tweet: Tweet[];
};

export enum NavigationActions {
	'NAVIGATE' = 'NAVIGATE',
}

export interface NavigateAction {
	action: NavigationActions.NAVIGATE;
	payload: Screens;
}
//post
export enum PostDataActions {
	'ADD' = 'ADD',
	'GET' = 'GET',
}

export interface AddPostAction {
	action: PostDataActions.ADD;
	payload: post[];
}

export interface GetPostAction {
	action: PostDataActions.GET;
	payload: post[];
}

//tweet

export enum TweetDataActions {
	'ADD' = 'ADD',
	'GET' = 'GET',
}

export interface AddTweetAction {
	action: TweetDataActions.ADD;
	payload: Tweet[];
}

export interface GetTweetAction {
	action: TweetDataActions.GET;
	payload: Tweet[];
}

export type Actions = NavigateAction | AddPostAction | GetPostAction | AddTweetAction | GetTweetAction;
