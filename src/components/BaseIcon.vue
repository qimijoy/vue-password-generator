<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		viewBox="0 0 24 24"
		:aria-labelledby="iconName"
		role="presentation"
	>
		<title :id="iconName" lang="en">{{ iconName }} icon</title>

		<g :fill="iconColor">
			<slot />
		</g>
	</svg>
</template>

<script setup lang="ts">
	defineProps({
		iconName: {
			type: String,
			default: 'box',
		},
		width: {
			type: [Number, String],
			default: 18,
		},
		height: {
			type: [Number, String],
			default: 18,
		},
		iconColor: {
			type: String,
			default: 'currentColor',
		},
	});
</script>

<style>
	svg {
		display: inline-block;
		vertical-align: baseline;
	}
</style>
