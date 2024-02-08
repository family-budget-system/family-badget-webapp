<template>
	<div class="flex gap-2 items-center family-open-sans">
    <bng-icon v-if="file" class="text-brightNavyBlueSolid" size="36">
      <bng-jpg-icon v-if="file.type.includes('jpg') || file.type.includes('jpeg')"/>

      <bng-pdf-icon v-if="file.type.includes('pdf')" />
      <bng-png-icon v-if="file.type.includes('png')" />
    </bng-icon>
    <bng-icon v-else-if="serverFile" class="text-brightNavyBlueSolid" size="36">
      <bng-jpg-icon v-if="getFileExtension(serverFile.objectName).includes('jpg') || getFileExtension(serverFile.objectName).includes('jpeg')"/>

      <bng-pdf-icon v-if="getFileExtension(serverFile.objectName).includes('pdf')" />
      <bng-png-icon v-if="getFileExtension(serverFile.objectName).includes('png')" />
    </bng-icon>

		<div class="w-full flex flex-col gap-1">
			<div class="flex justify-between items-center gap-6 mb-1">
        <div v-if="file" class="text-sm">{{ file.name }}</div>
        <div v-else-if="serverFile" class="text-sm">{{ getFileNameInObjectName(serverFile.objectName) }}</div>

        <div v-if="file" class="text-xs">{{ bytesToMb(file.size) }} мб</div>
        <div v-else-if="serverFile" class="text-xs">{{ bytesToMb(serverFile.size) }} мб</div>
			</div>

			<div class="h-[7px] bg-gradient-to-r from-brightNavyBlueSolid to-robinEggBlue"></div>
		</div>
    <bng-icon @click="removeFile" size="24" class="cursor-pointer"><bng-close-icon /></bng-icon>
	</div>
</template>

<script lang="ts" setup>
import {PropType} from "vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import BngCloseIcon from "@/assets/icons/BngCloseIcon.vue";
import BngJpgIcon from "@/assets/icons/BngJpgIcon.vue";
import BngPdfIcon from "@/assets/icons/BngPdfIcon.vue";
import BngPngIcon from "@/assets/icons/BngPngIcon.vue";
import {getFileExtension} from "@/utils/functions.utils.ts";
import {ServerFileType} from "@/@types/files.types.ts";
import {getFileNameInObjectName} from "@/utils/file.utils.ts";

const props = defineProps({
  file: {
    type: Object as PropType<File>,
    default: null
  },
  serverFile: {
    type: Object as PropType<ServerFileType>,
    default: null,
  }
})

const emit = defineEmits(["trashFile", "trashServerFile"])

const removeFile = () => {
  if (props.file) {
    emit('trashFile', props.file)
  } else if (props.serverFile) {
    emit("trashServerFile", props.serverFile)
  }
}

const bytesToMb = (sizeInBytes: number) => {
  return (sizeInBytes / (1024 * 1024)).toFixed(2);
};
</script>

<style lang="scss" scoped>

</style>

