<template>
	<div class="password__container">
		<h1 class="password__header">Password Generator</h1>

		<div class="password__controls">
			<div class="password__result">
				<input v-model="password" class="password__result-input" disabled />
				<BaseIcon class="password__result-copy" icon-name="CopyAll" width="24" height="24" @click="copyPassword">
					<CopyAll v-if="copyIconName === 'copy'" />
					<Success v-else-if="copyIconName === 'success'" />
				</BaseIcon>
			</div>

			<div :class="passwordStrengthComputedClasses"></div>

			<div class="password__length">
				<div class="password__details">
					<span>Password length</span>
					<span>{{ passwordLength }}</span>
				</div>
				<input
					v-model="passwordLength"
					class="password__length-input"
					type="range"
					min="2"
					max="32"
					:disabled="isControlsDisabled"
				/>
			</div>

			<ul class="password__settings">
				<li class="password__settings-option">
					<label class="password__settings-option-label">
						<input
							v-model="isLowercase"
							class="password__settings-option-input"
							type="checkbox"
							@change="generatePassword"
						/>
						<span class="password__settings-option-text">lowercase (a-z)</span>
					</label>
				</li>
				<li class="password__settings-option">
					<label class="password__settings-option-label">
						<input
							v-model="isUppercase"
							class="password__settings-option-input"
							type="checkbox"
							@change="generatePassword"
						/>
						<span class="password__settings-option-text">uppercase (A-Z)</span>
					</label>
				</li>
				<li class="password__settings-option">
					<label class="password__settings-option-label">
						<input
							v-model="isNumbers"
							class="password__settings-option-input"
							type="checkbox"
							@change="generatePassword"
						/>
						<span class="password__settings-option-text">numbers (0-9)</span>
					</label>
				</li>
				<li class="password__settings-option">
					<label class="password__settings-option-label">
						<input
							v-model="isSymbols"
							class="password__settings-option-input"
							type="checkbox"
							@change="generatePassword"
						/>
						<span class="password__settings-option-text">symbols (~!@#$%^&*)</span>
					</label>
				</li>
			</ul>

			<button class="password__generate" :disabled="isControlsDisabled" @click="generatePassword">
				Generate password
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Ref, ComputedRef } from 'vue';
	import type { SymbolsType } from '@/types/symbols.types';
	import { ref, computed, watch, onMounted } from 'vue';

	import BaseIcon from '@/components/BaseIcon.vue';
	import CopyAll from '@/components/Icons/CopyAll.vue';
	import Success from '@/components/Icons/Success.vue';

	const SETTINGS = {
		DEFAULT_PASSWORD_LENGTH: 16,
	};

	const SYMBOLS: SymbolsType = {
		lowercase: 'abcdefghijklmnopqrstuvwxyz',
		uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		numbers: '0123456789',
		symbols: '!$%&|[](){}:;.,*+-#@<>~',
	};

	// STATES
	const password: Ref<string> = ref('');
	const passwordLength: Ref<string> = ref('');
	const passwordStrengthClass: Ref<string> = ref('');
	const isLowercase: Ref<boolean> = ref(true);
	const isUppercase: Ref<boolean> = ref(false);
	const isNumbers: Ref<boolean> = ref(false);
	const isSymbols: Ref<boolean> = ref(false);
	const copyIconName: Ref<string> = ref('copy');

	// COMPUTED
	const passwordStrengthComputedClasses: ComputedRef<string[]> = computed(() => {
		return ['password__indicator', passwordStrengthClass.value];
	});

	const isControlsDisabled: ComputedRef<boolean> = computed(() => {
		return !(isLowercase.value || isUppercase.value || isNumbers.value || isSymbols.value);
	});

	const passwordSymbols: ComputedRef<string> = computed(() => {
		let symbols = '';

		if (isLowercase.value) symbols += SYMBOLS.lowercase;
		if (isUppercase.value) symbols += SYMBOLS.uppercase;
		if (isNumbers.value) symbols += SYMBOLS.numbers;
		if (isSymbols.value) symbols += SYMBOLS.symbols;

		return shuffleString(symbols);
	});

	// HOOKS
	onMounted(() => {
		passwordLength.value = String(SETTINGS.DEFAULT_PASSWORD_LENGTH);
	});

	// WATCHERS
	watch(passwordLength, () => {
		generatePassword();
		updatePasswordIndicator();
	});

	// METHODS
	const generatePassword = () => {
		if (isControlsDisabled.value) {
			return;
		}

		password.value = '';

		for (let i = 0; i < +passwordLength.value; i++) {
			password.value += getRandomSymbol(passwordSymbols.value);
		}
	};

	const getRandomSymbol = (symbols: string) => {
		return symbols[getRandomInRange(0, symbols.length - 1)];
	};

	const shuffleString = (string: string) => {
		return string
			.split('')
			.sort(() => 0.5 - Math.random())
			.join('');
	};

	const getRandomInRange = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const updatePasswordIndicator = () => {
		const length = +passwordLength.value;

		if (length >= 16) {
			passwordStrengthClass.value = 'password__indicator_strong';
		} else if (length >= 8) {
			passwordStrengthClass.value = 'password__indicator_average';
		} else {
			passwordStrengthClass.value = 'password__indicator_weak';
		}
	};

	const copyPassword = () => {
		if (copyIconName.value === 'success') {
			return;
		}

		navigator.clipboard.writeText(password.value);

		copyIconName.value = 'success';

		setTimeout(() => {
			copyIconName.value = 'copy';
		}, 1000);
	};
</script>

<style lang="scss">
	.password {
		display: flex;

		min-width: 400px;

		min-height: 100vh;
		align-items: center;
		justify-content: center;
	}

	.password__container {
		padding: 0 16px;

		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0 5px 10px rgb(0 0 0 / 0.1);

		@media (min-width: 576px) {
			max-width: 400px;
			margin: 0 15px;
		}
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

		color: #000000;
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

			transition: width 0.3s ease;
		}
	}

	.password__indicator_weak {
		&:before {
			width: 20%;

			background-color: #ff0000;
		}
	}

	.password__indicator_average {
		&:before {
			width: 50%;

			background-color: #ffa500;
		}
	}

	.password__indicator_strong {
		&:before {
			width: 100%;

			background-color: #43a047;
		}
	}

	.password__length {
		margin: 1.5rem 0;
	}

	.password__length-input {
		width: 100%;
		height: 5px;

		cursor: pointer;
	}

	.password__details {
		display: flex;
		justify-content: space-between;
	}

	.password__settings {
		display: grid;

		margin-top: 1rem;
		list-style: none;
		grid-template-columns: 1fr;

		gap: 0;

		@media (min-width: 576px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.password__settings-option {
		display: flex;

		width: 50%;
		margin-bottom: 1rem;
		align-items: center;
	}

	.password__settings-option-input {
		margin-right: 4px;
	}

	.password__settings-option-label {
		display: flex;

		color: #4f4f4f;

		cursor: pointer;
	}

	.password__settings-option-text {
		white-space: nowrap;
	}

	.password__generate {
		width: 100%;

		margin: 1rem 0;
		padding: 1rem 0.5rem;

		font-size: 1rem;

		color: #ffffff;
		background-color: #43a047;
		border: none;

		border-radius: 6px;

		text-transform: uppercase;

		cursor: pointer;

		transition: background-color 0.3s ease;

		&:hover {
			background-color: #3a7e3e;
		}

		&:disabled {
			background-color: #8e8e8e;
		}
	}
</style>
