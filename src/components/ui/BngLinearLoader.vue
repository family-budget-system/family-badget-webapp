<template>
	<div class="linear-activity">
		<div class="indeterminate"></div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
	name: "BngLinearLoader"
})
</script>

<style lang="scss" scoped>
.linear-activity {
	overflow: hidden;
	width: 100%;
	height: 7px;
	@apply bg-brightNavyBlueSolid
}

.determinate {
	position: relative;
	max-width: 100%;
	height: 100%;
	-webkit-transition: width 500ms ease-out 1s;
	-moz-transition: width 500ms ease-out 1s;
	-o-transition: width 500ms ease-out 1s;
	transition: width 500ms ease-out 1s;
	@apply bg-brightNavyBlueSolid
}

.indeterminate {
	position: relative;
	width: 100%;
	height: 100%;
}

.indeterminate:before {
	content: '';
	position: absolute;
	height: 100%;
	animation: indeterminate_first 1.5s infinite ease-out;
	@apply bg-brightNavyBlueSolid
}

.indeterminate:after {
	content: '';
	position: absolute;
	height: 100%;
	animation: indeterminate_second 1.5s infinite ease-in;
	@apply bg-brightNavyBlueSolid
}

@keyframes indeterminate_first {
	0% {
		left: -100%;
		width: 100%;
	}
	100% {
		left: 100%;
		width: 10%;
	}
}

@keyframes indeterminate_second {
	0% {
		left: -150%;
		width: 100%;
	}
	100% {
		left: 100%;
		width: 10%;
	}
}
</style>

