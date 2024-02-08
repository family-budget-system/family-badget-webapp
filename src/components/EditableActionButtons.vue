<script setup lang="ts">
import {computed, PropType} from "vue";
  import {InterfaceModsEnum} from "@/@types";
  import BngCloseIcon from "@/assets/icons/BngCloseIcon.vue";
  import BngIcon from "@/components/ui/BngIcon.vue";
  import BngPencilIcon from "@/assets/icons/BngPencilIcon.vue";
  import BngSaveIcon from "@/assets/icons/BngSaveIcon.vue";

  const props = defineProps({
    mode: {
      type: String as PropType<InterfaceModsEnum>,
      default: InterfaceModsEnum.VIEW,
    }
  })

  const emit = defineEmits(["edit", "save", "cancel"])
</script>

<template>
  <div class="flex items-center gap-6">
    <div
      v-if="mode === InterfaceModsEnum.VIEW"
      @click="emit('edit')"
      class="flex items-center gap-2 text-richBlack cursor-pointer hover:text-forestGreen transition-colors"
    >
      <bng-icon><bng-pencil-icon /></bng-icon>
      <div>{{ $t("common.edit") }}</div>
    </div>

    <div
      v-if="mode === InterfaceModsEnum.EDIT"
      class="flex items-center gap-6"
    >
      <div @click="emit('cancel')" class="flex items-center gap-2 cursor-pointer">
        <bng-icon><bng-close-icon /></bng-icon>
        <div>Отменить</div>
      </div>
      <div @click="emit('save')" class="text-forestGreen flex items-center gap-2 cursor-pointer hover:text-green-700 transition-colors">
        <bng-icon><bng-save-icon /></bng-icon>
        <div>Сохранить</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>