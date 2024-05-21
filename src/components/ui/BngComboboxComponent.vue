<template>
	<div class="relative w-full">
		<bng-text-field
			:error="error"
			:error-messages="errorMessages"
			v-show="!selected"
			ref="textField"
			v-model="searchText"
			:label="label"
      :placeholder="placeholder"
			:class="{ 'rounded-b-none': listOpen }"
		>
			<template v-if="searchText" v-slot:prepend-inner>
				<bng-icon class="cursor-pointer" @click="searchText = ''"><bng-close-icon /></bng-icon>
			</template>
		</bng-text-field>
		<div v-if="selected" class="bg-ghostWhite rounded-3xl border-2 border-antiFlashWhite h-[92px] px-6 flex items-center text-richBlack relative">
      <div class="flex flex-col gap-1">
        <div class="text-label top-6">{{ label }}</div>
        <div class="flex items-center gap-2 absolute top-11">
          <bng-icon class="cursor-pointer" @click="itemSelected(null)"><bng-close-icon /></bng-icon>
          <slot name="selected" :selected="selected">
            <div>{{ selected[itemText] }}</div>
          </slot>
        </div>
      </div>
		</div>

		<div v-if="listOpen" tabindex="0" @blur="isOpen = false" @mouseover="isOpen = true" @mouseleave="isOpen = false" class="bg-ghostWhite rounded-b-3xl w-full absolute z-50 max-h-[350px] overflow-y-auto border-2 border-antiFlashWhite border-t-0" :class="{ 'border-brightNavyBlueSolid': focused }">
			<slot name="items" :filteredItems="filteredItems" :selectItem="itemSelected">
				<div v-if="filteredItems.length && !isLoading">
					<div v-for="(item, i) of filteredItems" :key="item[itemValue]">
						<slot name="item" :item="item" :itemSelected="itemSelected">
							<div :tabindex="i" class="px-4 py-3 hover:bg-gray-200 transition-colors cursor-pointer text-richBlack" @click.stop="itemSelected(item)">{{ item[itemText] }}</div>
              <div class="mx-3 h-[1px] bg-antiFlashWhite"></div>
						</slot>
					</div>
				</div>
        <div class="py-4 flex px-6 gap-3 flex-col justify-center items-center text-2" v-else-if="isLoading">
          <div>Поиск</div>
          <bng-linear-loader />
        </div>
				<div class="py-4 flex justify-center items-center text-2" v-else-if="!items.length && !isLoading">
					Ничего не найдено
				</div>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import {computed, onMounted, PropType, Ref, ref, watch} from "vue";
import BngTextField from "@/components/ui/BngTextField.vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import BngCloseIcon from "@/assets/icons/BngCloseIcon.vue";
import BngLinearLoader from "@/components/ui/BngLinearLoader.vue";

const emit = defineEmits(["inputText", "update:modelValue"])

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
  error: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: Array as PropType<any[]>,
    default: [],
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  alwaysShowList: {
    type: Boolean,
    default: false,
  }
})

const selected: Ref<any> = ref(null)
const searchText = ref("")
const isOpen = ref(false)
const mouseInList = ref(false)

const textField = ref(null)

const focused = computed(() => (textField.value as any)?.focused ?? false)

const filteredItems = computed(() => {
  if (!searchText.value) return props.items
  else return props.items.filter((item: any) => item[props.itemText].toLowerCase().includes(searchText.value.toLowerCase()))
})

const listOpen = computed(() => {
  if (props.alwaysShowList) {
    return focused.value || isOpen.value
  } else return isOpen.value || (searchText.value.length && focused.value)
})


onMounted(() => {
  selected.value = props.items.find((item: any) => item[props.itemValue] === props.modelValue)
})

watch(() => props.modelValue, (value) => selected.value = props.items.find((item: any) => item[props.itemValue] === value))

watch(() => searchText.value, (value: string) => {
  if (!props.alwaysShowList) {
    isOpen.value = !!value.length
  }
  emit("inputText", value)
})

const itemSelected = (item: any) => {
  selected.value = item
  isOpen.value = false
  if (item === null) {
    emit('update:modelValue', item)
  } else {
    searchText.value = item[props.itemText]
    emit('update:modelValue', item[props.itemValue])
  }
}
</script>

<style lang="scss" scoped>

</style>

