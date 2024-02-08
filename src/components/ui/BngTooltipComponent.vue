<script setup lang="ts">
import {PropType, ref} from "vue";
import {createPopper, Placement} from "@popperjs/core";

const props = defineProps({
  placement: {
    type: String as PropType<Placement>,
    default: "bottom",
  }
})

const showTooltip = ref(false)

const triggerEl = ref(null)
const targetEl = ref(null)

const toggleTooltip = (value: boolean) => {
  showTooltip.value = value;
  if (value) {
    createPopper(triggerEl.value as any, targetEl.value as any, {
      placement: props.placement,
    });
  }
}

</script>

<template>
  <div @mouseover="toggleTooltip(true)" @mouseleave="toggleTooltip(false)">
    <div ref="triggerEl">
      <slot></slot>
    </div>
    <transition name="fade">
      <div v-if="showTooltip" ref="targetEl" role="tooltip" class="tooltip max-w-[400px] backdrop-opacity-50">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.tooltip {
  @apply text-base absolute border-[1px] border-lavender p-3 bg-cultured/95 rounded-xl;
}
</style>