<template>
	<div class="relative w-full">
		<Listbox :disabled="disabled" v-slot="{ open }" v-model="selectedValue" class="w-full relative">
			<div>
				<transition name="slide-fade">
					<label
						v-if="label && !error || label && disabled && !error || open"
						for="iz-input"
						class="text-label absolute top-6 left-6"
						:class="{ 'text-gray-400': disabled }"
					>{{ label }}</label>
					<label v-else-if="error && errorMessages.length" for="iz-input" class="text-label text-label--error top-6 left-6">{{ errorMessages[0].$message }}</label>
				</transition>
				<ListboxButton
					class="w-full rounded-3xl font-sans bg-ghostWhite border-2 border-antiFlashWhite text-start cursor-pointer flex flex-col items-start"
					:class="{
            'rounded-b-none': open,
            'border-tuscanySolid': error,
            'border-brightNavyBlueSolid': focused || open,
            'min-h-[92px]': size === 'default',
            'h-[48px]': size === 'small',
            'border-paleCornflowerBlueSolid bg-transparent': disabled,
          }"
					@focus="focused = true"
					@blur="focused = false; blurFunc()"
				>
          <div
            class="flex justify-between w-full"
            :class="{
              'pl-5': !disabled && size === 'default',
              'mt-11 px-6': size === 'default',
              'mt-3 px-3': size === 'small'
            }"
          >
            <div class="flex gap-2 max-w-full">
              <bng-icon v-if="!disabled" class="text-dark" :class="{ 'text-darkElectricBlue': disabled, 'text-richBlack': selectedValue }"><bng-angle-down-icon /></bng-icon>
              <div
                class="text-base max-md:text-sm whitespace-nowrap truncate"
                :class="{ 'text-ceil': !selectedValue, 'text-richBlack': !disabled && selectedValue }"
              >{{ buttonPlaceholder }}</div>
            </div>

            <bng-icon @click.stop="onClear" v-if="clear && selectedValue"><bng-close-icon /></bng-icon>
          </div>
				</ListboxButton>
				<ListboxOptions
          class="bg-cultured rounded-b-xl w-full absolute z-50 max-h-[350px] overflow-y-auto border-2 border-brightNavyBlueSolid border-t-0"
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
							<li class="px-6 text-base font-sans pb-3 hover:bg-gray-200 cursor-pointer text-richBlack">
								<hr size="1" class="pt-3">
								<span>{{ itemText && item ? item[itemText] : item }}</span>
							</li>
						</ListboxOption>
					</slot>
				</ListboxOptions>
			</div>
		</Listbox>
	</div>
</template>

<script lang="ts">
import {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions} from "@headlessui/vue";
import {defineComponent, PropType} from "vue";
import BngAngleDownIcon from "@/assets/icons/BngAngleDownIcon.vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import BngCloseIcon from "@/assets/icons/BngCloseIcon.vue";

export default defineComponent({
	name: "BngSelect",
	components: {BngCloseIcon, ListboxLabel, BngIcon, ListboxOption, ListboxOptions, BngAngleDownIcon, ListboxButton, Listbox},
	data: () => ({
		focused: false,
	}),
	props: {
		placeholder: {
			type: String,
			default: "",
		},
		label: {
			type: String,
			default: "",
		},
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
		disabled: {
			type: Boolean,
			default: false,
		},
		error: {
			type: Boolean,
			default: false,
		},
		errorMessages: {
			type: Array as PropType<any[]>,
			default: [],
		},
		blurFunc: {
			type: Function,
			default: () => {},
		},
		clear: {
			type: Boolean,
			default: false,
		},
		returnObject: {
			type: Boolean,
			default: false,
		},
    size: {
      type: String as PropType<"default" | "small">,
      default: "default",
    }
	},
	computed: {
		selectedValue: {
			get: function (): any {
				if (this.returnObject) {
					return this.modelValue
				} else {
					return this.items.find((item: any) => {
						if (item[this.itemValue] === this.modelValue) return item
					})
				}
			},
			set: function (value: any) {
				if (this.returnObject) {
					this.$emit("update:modelValue", this.items.find((item: any) => item[this.itemValue] === value) ?? null)
				} else {
					this.$emit("update:modelValue", value)
				}
			}
		},

		buttonPlaceholder() {
			if (this.selectedValue) {
				return this.itemText ? this.selectedValue[this.itemText] : this.selectedValue
			} else {
				return this.placeholder
			}
		}
	},
	methods: {
		onClear() {
			this.selectedValue = null
		},
	},
})
</script>

<style lang="scss" scoped>

</style>
