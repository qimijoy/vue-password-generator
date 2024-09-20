import globals from 'globals';
import js from '@eslint/js';
import tsESlint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
	// Игнорируемые файлы
	{
		ignores: ['dist', 'public', 'calc_old'],
	},
	// Файлы, которые будут линтиться
	{
		files: ['**/*.{js,cjs,mjs,ts,vue}'],
	},
	{
		linterOptions: {
			noInlineConfig: true,
			reportUnusedDisableDirectives: 'error',
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2022,
			},
		},
	},
	{
		name: 'JS',
		files: ['**/*.{js,mjs,cjs,ts,vue}'],
		rules: js.configs.recommended.rules,
	},

	...tsESlint.configs.recommended,
	{
		name: 'TS',
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsESlint.parser,
		},
	},

	...pluginVue.configs['flat/recommended'],
	{
		name: 'Vue',
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
		rules: {
			'vue/component-definition-name-casing': ['error', 'kebab-case'],
		},
	},

	// Должно быть последним, чтобы Prettier не конфликтовал с Eslint
	eslintPluginPrettierRecommended,
];
