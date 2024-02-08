<template>
  <div>
    <FileDragAndDropComponent
      ref="fileDragAndDrop"
      :title="title"
      :subtitle="subtitle"
      :error="error"
      @dragover="handleDragOver"
      @drop="handleDrop"
      @click="openFilePicker"
      @input-file="handleFilesSelected"
    >
      <div class="flex flex-col gap-2">
        <BngUploadFileItem v-for="file of selectedFiles" :key="file.name" :file="file" @trashFile="removeFile" />
        <BngUploadFileItem
          v-for="serverFile of serverFiles"
          :key="serverFile.objectName"
          :serverFile="serverFile"
          @trashServerFile="(removedServerFile) => $emit('removeServerFile', removedServerFile)"
        />
      </div>
    </FileDragAndDropComponent>
  </div>
</template>

<script lang="ts" setup>
import {computed, defineComponent, PropType, ref, watch} from "vue";
import uploadFilesHook from "@/components/ui/hooks/uploadFilesHook";
import FileDragAndDropComponent from "@/components/FileDragAndDropComponent.vue";
import BngUploadFileItem from "@/components/ui/BngUploadFileItem.vue";
import {ServerFileType} from "@/@types/files.types.ts";

const props = defineProps({
  serverFiles: {
    type: Array as PropType<ServerFileType[]>,
    default: [],
  },
  modelValue: {
    type: Array as PropType<File[]>,
    default: [],
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  maxFiles: {
    type: Number,
    default: 100,
  },
  error: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["update:modelValue", "removeServerFile"])

const fileDragAndDrop = ref(null)

const { handleDragOver, handleFilesSelected, handleDrop, selectedFiles, removeFile } = uploadFilesHook(emit, props.maxFiles)

const openFilePicker = () => {
  (fileDragAndDrop.value as any).openFilePicker()
}
</script>

<style lang="scss" scoped>

</style>

