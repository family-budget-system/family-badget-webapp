<template>
	<VueDatePicker
		v-model="date"
		locale="ru-RU"
		select-text="Выбрать"
		cancel-text="Отмена"
		:enable-time-picker="false"
		:format="format"
		:disabled="disabled"
		:max-date="maxDate"
		@update:model-value="$emit('update:modelValue', date)"
	>
		<template #trigger>
			<bng-text-field
				readonly
				:model-value="format(date)"
				:label="label"
				prepend-inner-icon="calendar"
				:disabled="disabled"
				class="cursor-pointer"
				:error="error"
				:error-messages="errorMessages"
				:blur-func="blurFunc"
        :placeholder="placeholder"
			></bng-text-field>
		</template>
	</VueDatePicker>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import BngTextField from "@/components/ui/BngTextField.vue";

export default defineComponent({
	name: "BngDatePicker",
	components: {BngTextField, VueDatePicker},
	props: {
		label: {
			type: String,
			default: "",
		},
    placeholder: {
      type: String,
      default: "",
    },
		disabled: {
			type: Boolean,
			default: false,
		},
		maxDate: {
			type: Date,
			default: new Date(),
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
		modelValue: {
			type: Object as PropType<null | Date>,
			default: null,
		}
	},
	data: () => ({
		date: null as Date | null,
		format: (date: any) => {
			if (date) {
				const day = date.getDate() > 9 ? (date.getDate().toString()) : `0${date.getDate()}`;
				const month = date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString() : `0${date.getMonth() + 1}` ;
				const year = date.getFullYear();
				return `${day}.${month}.${year}`;
			}
			else return "";
		}
	}),
	watch: {
		modelValue(value) {
			this.date = value
		}
	},
	mounted() {
		this.date = this.modelValue
	}
})
</script>

<style lang="scss" scoped>

</style>

