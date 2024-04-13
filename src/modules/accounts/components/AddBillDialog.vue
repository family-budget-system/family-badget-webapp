<script setup lang="ts">

import BngDialog from "@/components/ui/BngDialog.vue";
import {ref} from "vue";

const dialog = ref(null)

const showDialog = () => {
  (dialog.value as any).showDialog()
}

defineExpose({
  showDialog
})
</script>

<template>
  <BngDialog card-classes="sm:min-w-[640px] max-sm:w-full" ref="dialog" title="Добавить карту, вклад, кредит">
    
  </BngDialog>
</template>

<style scoped>

</style>