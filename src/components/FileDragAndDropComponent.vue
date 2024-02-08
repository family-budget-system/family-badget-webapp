<script setup lang="ts">
import {ref} from "vue";
import BngCloudUploadIcon from "@/assets/icons/BngCloudUploadIcon.vue";
import BngIcon from "@/components/ui/BngIcon.vue";

const emit = defineEmits(["dragover", "drop", "click", "inputFile"])

const props = defineProps({
  title: {
    type: String,
    default: "Выберите файл или перенесите его сюда"
  },
  subtitle: {
    type: String,
    default: "Максимальный размер файла: 10 МБ. Допустимые форматы прикрепляемых файлов: pdf, png, jpeg, jpg"
  },
  error: {
    type: Boolean,
    default: false
  }
})

const fileInput = ref(null)

const openFilePicker = () => {
  (fileInput.value as any).click();
}

defineExpose({ openFilePicker })
</script>

<template>
  <div
      class="card card--white p-6 border-antiFlashWhite rounded-xl"
      :class="{ 'border-tuscanySolid border-2': error }"
  >
    <div
      class="family-open-sans cursor-pointer select-none text-center mb-6"
      @dragover="(e) => $emit('dragover', e)"
      @drop="(e) => $emit('drop', e)"
      @click="(e) => $emit('click', e)"
    >
      <div class="card bg-cultured border-antiFlashWhite rounded-xl py-6 flex justify-center hover:shadow-lg hover:animate-pulse">
        <input
          ref="fileInput"
          type="file"
          style="display: none"
          accept=".pdf, .png, .jpeg, .jpg"
          multiple
          @change="(e) => $emit('inputFile', e)"
        />

        <div class="flex gap-2 flex-col justify-center">
          <div class="flex items-center gap-3 justify-center">
            <bng-icon class="text-brightNavyBlueSolid"><bng-cloud-upload-icon /></bng-icon>
            <div class="text-base text-dark hidden md:block" v-html="title"></div>
          </div>
          <div class="text-xs text-gray-default md:text-center text-zinc-500" v-html="subtitle"></div>
        </div>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<style scoped lang="scss">

</style>