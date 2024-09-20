<template>
	<div class="password__container">
		<h1 class="password__header">Password Generator</h1>

		<div class="password__controls">
			<div class="password__result">
				<input class="password__result-input" disabled />
				<BaseIcon class="password__result-copy" icon-name="CopyAll" width="24" height="24">
					<CopyAll />
				</BaseIcon>
			</div>

			<div :class="passwordStrengthClass"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import BaseIcon from '@/components/BaseIcon.vue';
	import CopyAll from '@/components/Icons/CopyAll.vue';

	// STORE
	import { usePasswordStore } from '@/stores/passwordStore';
	const passwordStore = usePasswordStore();

	// COMPUTED
	const test = computed(() => passwordStore.test);

	const passwordStrengthClass = computed(() => {
		return ['password__indicator', 'password__indicator_weak'];
	});
</script>

<style lang="scss">
	.password__container {
		width: 500px;

		background-color: white;
		border-radius: 8px;
		box-shadow: 0 5px 10px rgb(0 0 0 / 0.1);
	}

	.password__header {
		padding: 1.5rem;

		font-size: 1.2rem;
		font-weight: 600;

		border-bottom: 1px solid #c0c0c0;
	}

	.password__controls {
		margin: 1.5rem;
	}

	.password__result {
		position: relative;
	}

	.password__result-input {
		width: 100%;
		height: 55px;
		padding: 0 2.5rem 0 1.5rem;

		font-size: 1rem;

		color: black;
		background: none;
		border: 1px solid #aaaaaa;
		border-radius: 4px;
	}

	.password__result-copy {
		display: flex;

		position: absolute;
		top: 50%;
		right: 15px;
		transform: translate(0, -50%);

		line-height: 55px;

		color: #707070;

		cursor: pointer;

		&:hover {
			color: #8e8e8e;
		}
	}

	.password__indicator {
		position: relative;

		width: 100%;
		height: 5px;
		margin-top: 1rem;

		border-radius: 25px;

		&:before {
			position: absolute;

			width: 50%;
			height: 100%;
			content: '';
		}
	}

	.password__indicator_weak {
		&:before {
			width: 20%;

			background-color: red;
		}
	}
</style>
