<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type { PropType, ComputedRef } from "vue";

export type ObjectType = {
  id?: number,
  address: string,
  addressName?: string,
}

const MAX_SHOW_OBJECTS_LENGTH = 6

const props = defineProps({
  objects: {
    type: Object as PropType<ObjectType[]>,
    default: [],
  },
})

const isShowAllObjects = ref(false)
const getCutObjects: ComputedRef<ObjectType[]> = computed(() => props.objects ? props.objects.slice(0, MAX_SHOW_OBJECTS_LENGTH) : [])

const objects = computed(() => {
  if (!isShowAllObjects.value) {
    return props.objects
  } else return getCutObjects.value
})

onMounted(() => {
  if (props.objects && props.objects.length > MAX_SHOW_OBJECTS_LENGTH) isShowAllObjects.value = true
})

</script>

<template>
  <div v-if="objects" class="flex flex-col gap-3">
    <div v-for="(object, i) of objects" :key="i" class="flex flex-col gap-3">
      <div class="text-richBlack">{{ object.address }}</div>
      <div v-if="objects.length !== i + 1" class="h-[1px] bg-lavender"></div>
    </div>
    <div
      v-if="isShowAllObjects"
      @click="isShowAllObjects = false"
      class="text-md text-brightNavyBlueSolid cursor-pointer hover:underline"
    >{{ $t("common.showAll") }}</div>
  </div>
</template>

<style scoped>

</style>