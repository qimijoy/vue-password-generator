import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePasswordStore = defineStore('passwordStore', () => {
	const test = ref('hello');

	return {
		test,
	};
});
