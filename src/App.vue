<template>
	<h1>{{ test }}</h1>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	// STORE
	import { usePasswordStore } from '@/stores/passwordStore';
	const passwordStore = usePasswordStore();

	// COMPUTED
	const test = computed(() => passwordStore.test);
</script>
