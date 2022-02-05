import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		currGuess: '',
		orangeLetters: '',
		notLetters: '',
		result1: null,
		result2: null,
	}
});

export default app;