<template>
	<div :class="[bgClass, loaderClass, 'relative overflow-hidden']">
		<div class="shimmer absolute top-0 right-0 bottom-0 left-0" :style="shimmerStyle"></div>
		<slot />
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

const LOADER_TYPES = { rectangle: 'rectangle', circle: 'circle' };

const LOADER_CSS_CLASSES = {
	[LOADER_TYPES.rectangle]: 'rounded-2xl',
	[LOADER_TYPES.circle]: 'rounded-full',
};

type LoaderTypesKeys = keyof typeof LOADER_TYPES;
type LoaderTypesValues = typeof LOADER_TYPES[LoaderTypesKeys];

const SHIMMER_COLOR = '#ffffff';

const isHexColor = (hexColor: string) => {
	const hex = hexColor.replace('#', '');

	return hexColor.startsWith('#') && hex.length === 6 && !isNaN(Number('0x' + hex));
};

const hexToRgb = (hex: string) => `${hex.match(/\w\w/g)?.map((x) => +`0x${x}`)}`;
export default defineComponent({
	name: "BngSkeletonLoader",
	props: {
		type: {
			type: String,
			default: LOADER_TYPES.rectangle,
			validator(value: LoaderTypesValues) {
				return Object.values(LOADER_TYPES).includes(value);
			},
		},
		bgClass: {
			type: String,
			default: 'bg-gray-300',
		},
		cssClass: {
			type: String,
			default: '',
		},
		shimmerColor: {
			type: String,
			default: SHIMMER_COLOR,
		},
	},
	computed: {
		shimmerStyle() {
			const rgb = isHexColor(this.shimmerColor) ? hexToRgb(this.shimmerColor) : SHIMMER_COLOR;

			return {
				backgroundImage: `linear-gradient(90deg, rgba(${rgb}, 0) 0%, rgba(${rgb}, 0.2) 20%, rgba(${rgb}, 0.5) 60%, rgba(${rgb}, 0))`,
			};
		},
		loaderClass() {
			return this.cssClass ? this.cssClass : LOADER_CSS_CLASSES[this.type]
		}
	}
})
</script>

<style lang="scss" scoped>
.shimmer {
	transform: translateX(-100%);
	animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
	100% {
		transform: translateX(100%);
	}
}
</style>

