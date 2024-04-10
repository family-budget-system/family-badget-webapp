<script setup lang="ts">
defineProps({
  secondary: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <button
    type="button"
    class="whitespace-nowrap text-base py-3 px-6 rounded-3xl focus:ring focus:ring-offset-ceil transition-colors flex justify-center items-center"
    :class="{
      'text-brightNavyBlueSolid bg-lavenderLight hover:bg-lavender border-[1px] border-lavender': !secondary,
      'text-richBlack bg-white hover:bg-azureishWhite': secondary && !disabled,
      'border-[1px] border-azureishWhite text-richBlack': outlined && !disabled,
      'bg-transparent text-darkElectricBlue border-[1px] border-lavender': disabled,
    }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>

</style>