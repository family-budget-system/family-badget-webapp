<script setup lang="ts">

import BngAngleDownIcon from "@/assets/icons/BngAngleDownIcon.vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/vue";
import {computed, PropType} from "vue";

const props = defineProps({
  items: {
    type: Array as PropType<any>,
    default: [],
  },
  itemText: {
    type: String,
    default: "",
  },
  itemValue: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, null, Object] as PropType<any>,
    default: null,
  },
})

const emit = defineEmits(["update:modelValue"])

const selectedValue = computed({
  get: function (): any {
    return props.items.find((item: any) => {
      if (item[props.itemValue] === props.modelValue) return item
    })
  },
  set: function (value) {
    emit("update:modelValue", value)
  }
})
</script>

<template>
  <div class="relative w-full">
    <Listbox v-slot="{ open }" v-model="selectedValue" class="w-full relative">
      <div>
        <ListboxButton as="div" class="flex items-center gap-2 text-richBlack cursor-pointer">
          <bng-icon class="transition-transform" :class="{ 'rotate-180': open }"><bng-angle-down-icon /></bng-icon>
          <div>{{ itemText ? selectedValue[itemText] : selectedValue }}</div>
        </ListboxButton>
        <ListboxOptions
          class="bg-ghostWhite border-antiFlashWhite rounded-xl min-w-[430px] absolute z-50 max-h-[350px] overflow-y-auto border-[1px] focus-visible:outline-none"
        >
          <slot name="items" :items="items">
            <ListboxOption
              v-for="(item, key) of items"
              :value="itemValue && item ? item[itemValue] : item"
              :key="key"
              as="template"
              class="rounded-xl"
              @click.stop
            >
              <li class="px-6 text-base font-sans hover:bg-gray-200 pt-2 cursor-pointer text-richBlack">
                <div class="pb-2">{{ itemText && item ? item[itemText] : item }}</div>
                <div class="bg-lavender h-[1px]"></div>
              </li>
            </ListboxOption>
          </slot>
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
</template>

<style scoped>

</style>