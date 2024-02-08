<script setup lang="ts">
import {computed, PropType} from "vue";
import {TabType} from "@/@types";

const props = defineProps({
  tabs: {
    type: Array as PropType<TabType[]>,
    default: [],
  },
  modelValue: {
    type: String as PropType<string>,
    default: "",
  }
})

const emit = defineEmits(["update:modelValue"])

const selectedTab = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit("update:modelValue", value)
  }
})
</script>

<template>
  <div>
    <div class="inline-block">
      <div class="inline-flex items-center gap-6">
        <div v-for="(tab) of tabs" :key="tab.value" class="relative">
          <div
            class="whitespace-nowrap pb-1 cursor-pointer transition-colors text-lg font-semibold"
            :class="{
              'text-brightNavyBlueSolid': tab.value === selectedTab && !tab.error,
              'text-darkElectricBlue': tab.value !== selectedTab,
              'text-tuscanySolid': tab.error,
            }"
            @click="selectedTab = tab.value"
          >{{ tab.name }}</div>
          <div
            v-show="selectedTab === tab.value"
            class="absolute h-[2px] w-full"
            :class="{ 'bg-tuscanySolid': tab.error, 'bg-brightNavyBlueSolid': !tab.error }"
          ></div>
        </div>
      </div>
      <div class="relative -z-10 bg-lightSilver h-[2px] w-full"></div>
    </div>
  </div>
</template>

<style scoped>

</style>