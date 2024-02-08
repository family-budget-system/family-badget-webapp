<script lang="ts" setup>
import {ref, PropType, Ref, onMounted} from 'vue';
import {RadioGroup, RadioGroupOption} from "@headlessui/vue";

const props = defineProps({
  items: {
    type: Object as PropType<any[]>,
    required: true,
    default: [],
  },
  itemValue: {
    type: String as PropType<string>,
    required: true,
    default: "",
  },
  itemText: {
    type: String as PropType<string>,
    required: true,
    default: "",
  },
  modelValue: {
    type: [String, Number, Boolean, null] as PropType<string | number | boolean | null>,
    default: null
  },
})

const emit = defineEmits(["update:modelValue"])

const selectedValue: Ref<any> = ref(props.items[0][props.itemValue])

const updateRadioValue = (value: string) => {
  selectedValue.value = value
  emit("update:modelValue", value)
}

onMounted(() => {
  selectedValue.value = props.modelValue
})

</script>
<template>
  <RadioGroup class="flex flex-col gap-3" :modelValue="selectedValue" @update:modelValue="updateRadioValue">
    <RadioGroupOption v-for="item of items" :value="item[itemValue]" :key="item[itemValue]" v-slot="{ checked }">
      <div class="flex gap-2 items-center">
        <img v-if="checked" src="@/assets/images/radiobutton_checked.svg" alt="">
        <img v-else src="@/assets/images/radiobutton_unchecked.svg" alt="">
        <div class="cursor-pointer family-open-sans text-gray-default text-left">{{ item[itemText] }}</div>
      </div>
    </RadioGroupOption>
  </RadioGroup>
</template>
