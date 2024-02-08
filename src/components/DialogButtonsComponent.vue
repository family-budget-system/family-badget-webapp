<script setup lang="ts">

import BngSaveIcon from "@/assets/icons/BngSaveIcon.vue";
import BngPencilIcon from "@/assets/icons/BngPencilIcon.vue";
import BngTrashAltIcon from "@/assets/icons/BngTrashAltIcon.vue";
import BngButton from "@/components/ui/BngButton.vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import {computed, PropType} from "vue";

const props = defineProps({
  mode: {
    type: String as PropType<'edit' | 'view' | 'create'>,
    default: "view"
  },
  disabledSaveButton: {
    type: Boolean,
    default: false
  },
  hideTrashButton: {
    type: Boolean,
    default: false,
  }
})

const cancelText = computed(() => {
  if (props.mode === 'view') {
    return "Закрыть"
  } else return "Отменить"
})

const emit = defineEmits(["trash", "edit", "save", "close"])
</script>

<template>
  <div class="flex items-center" :class="{ 'justify-between': mode === 'edit' && !hideTrashButton, 'justify-end': (mode !== 'edit') || hideTrashButton }">
    <BngButton
      v-if="!hideTrashButton && mode === 'edit'"
      @click="emit('trash')"
      class="flex gap-2 items-center min-w-[160px] text-sm"
      secondary
      outlined
    >
      <bng-icon><bng-trash-alt-icon /></bng-icon>
      <div>Удалить</div>
    </BngButton>
    <div class="flex justify-end items-center gap-6">
      <BngButton v-if="mode === 'view'" @click="emit('edit')" class="flex gap-2 items-center min-w-[160px] text-sm" secondary outlined>
        <bng-icon><bng-pencil-icon /></bng-icon>
        <div>Редактировать</div>
      </BngButton>
      <BngButton
          v-if="['edit', 'create'].includes(mode)"
          @click="emit('save')"
          class="flex gap-2 items-center min-w-[160px] text-sm"
          secondary
          outlined
          :disabled="disabledSaveButton"
      >
        <bng-icon><bng-save-icon /></bng-icon>
        <div>Сохранить</div>
      </BngButton>
      <BngButton @click="emit('close')" class="flex gap-2 items-center min-w-[160px] text-sm" secondary outlined>{{ cancelText }}</BngButton>
    </div>
  </div>
</template>

<style scoped>

</style>