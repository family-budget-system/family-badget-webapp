<template>
  <div
    class="border-2 flex max-sm:px-2 relative"
    @click="focusInput"
    :class="{
      'border-brightNavyBlueSolid': focused,
      'border-tuscanySolid': error,
      'bg-ghostWhite border-antiFlashWhite': !disabled && size !== 'large',
      'border-paleCornflowerBlueSolid backdrop-opacity-0': disabled,
      'h-[72px] rounded-xl': secondary && size === 'default',
      'rounded-3xl h-[92px]': !secondary && size === 'default',
      'p-3 h-[48px] rounded-3xl': size === 'small',
      'p-0 border-none h-[32px]': size === 'large',
      'px-6': size === 'default',
    }"
  >
    <div class="inline-block cursor-text w-full">
      <Transition name="slide-fade">
        <label
          v-if="label && !error || label && disabled && size !== 'large'"
          for="bng-input"
          class="text-label"
          :class="{
            'text-ceil': disabled,
            'top-0': secondary || size === 'small' || size === 'large',
            'top-6 left-6': size === 'default',
          }"
        >{{ label }}</label>
        <label
          v-else-if="error && errorMessages.length"
          for="bng-input"
          class="text-label text-label--error"
          :class="{ 'top-2': secondary, 'top-6': size !== 'large', '-top-4': size === 'large' }"
        >{{ errorMessages[0].$message }}</label>
      </Transition>

      <div class="flex items-center gap-2 pb-1" :class="{
         'top-6': !disabled && secondary && size === 'default',
         'top-11': !secondary && size !== 'large',
         'text-base relative': size !== 'large',
         'pb-2 text-2xl font-bold top-0': size === 'large',
         'border-b-[2px] border-lavenderLight': focused,
         'border-b-[2px] border-tuscanySolid': error && size == 'large',
      }">
        <slot name="prepend-inner">
          <bng-icon
            v-if="prependInnerIcon"
            :class="{
              'text-darkElectricBlue': disabled,
              'text-richBlack': !disabled,
            }"
          >
            <component :is="`bng-${prependInnerIcon}-icon`" />
          </bng-icon>
        </slot>
        <input
          ref="bng-input"
          :type="type"
          name="bng-input"
          :disabled="disabled"
          :placeholder="placeholder"
          :readonly="readonly"
          :maxlength="maxlength"
          class="customInput"
          :class="{
            'bg-ghostWhite text-richBlack ': !disabled,
            'bg-transparent': size === 'large',
            'text-darkElectricBlue bg-transparent overflow-ellipsis': disabled,
          }"
          v-mask:[maskOptions]
          :value="localValue"
          @input="onInput"
          @focus="focused = true"
          @blur="focused = false; blurFunc()"
        >
      </div>
    </div>
    <bng-icon @click="eyeOpen = !eyeOpen" v-if="inputType === 'password'" class="cursor-pointer text-gray-default">
      <component :is="eyeOpen ? 'bng-eye-open-icon' : 'bng-eye-close-icon'" />
    </bng-icon>
    <slot name="append-inner-icon">
      <bng-icon
        v-if="appendInnerIcon"
        class="ml-2"
        :class="{
          'text-darkElectricBlue': disabled,
          'mt-11': !secondary,
          'mt-6 text-darkElectricBlue': secondary,
        }"
        @click.stop="$emit('appendInnerIconClick')"
      >
        <component :is="`bng-${appendInnerIcon}-icon`" />
      </bng-icon>
    </slot>
  </div>
</template>

<script lang="ts">


import {defineComponent, PropType} from "vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import {InputTypes, MaskTypes} from "@/@types/input.types.ts";
import {CleaveRules} from "@/config/cleave-rules.ts";
import {CleaveOptions} from "cleave.js/options";
import Cleave from "cleave.js";
import {MaskOptions} from "maska";

export default defineComponent({
  name: "BngTextField",
  components: {BngIcon},
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: [Number, String],
      default: 200,
    },
    maskType: {
      type: String as PropType<MaskTypes>,
      default: "any",
    },
    customCleaveOptions: {
      type: Object,
      default: null,
    },
    maskOptions: {
      type: Object as PropType<MaskOptions>,
      default: {},
    },
    label: {
      type: String,
      default: "",
    },
    prependInnerIcon: {
      type: String,
      default: "",
    },
    appendInnerIcon: {
      type: String,
      default: "",
    },
    inputType: {
      type: String as PropType<InputTypes>,
      default: "text",
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
    alwaysShowLabel: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<"large" | "default" | "small">,
      default: "default"
    },
    dataMaskaReversed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    type(): string {
      if (this.inputType === InputTypes.password && this.eyeOpen) {
        return "password"
      } else {
        return "text"
      }
    },
    cleaveRule(): CleaveOptions {
      if (this.customCleaveOptions) {
        return this.customCleaveOptions
      } else {
        return CleaveRules[this.maskType] ?? CleaveRules[MaskTypes.any];
      }
    },
  },
  data: () => ({
    focused: false,
    inputEl: {} as any,
    eyeOpen: true,
    localValue: "",

    cleave: null as Cleave | null,
  }),
  methods: {
    focusInput() {
      this.inputEl.focus();
    },
    onInput(e: any) {
      if (this.cleave && (this.maskType !== MaskTypes.any || this.customCleaveOptions)) {
        if (e.target.value === "") {
          this.cleave.properties.result = ""
          this.$emit("update:modelValue", "")
        } else {
          this.$emit("update:modelValue", this.cleave.getRawValue())
        }
      } else {
        this.$emit("update:modelValue", e.target.value)
      }
    },
    setCleaveAndValue() {
      if (this.customCleaveOptions) {
        this.cleave = new Cleave(this.inputEl as HTMLElement, this.customCleaveOptions)
      } else {
        this.cleave = new Cleave(this.inputEl as HTMLElement, this.cleaveRule)
      }

      if (this.cleave && (this.maskType !== MaskTypes.any || this.customCleaveOptions)) {
        if (this.modelValue === "") {
          this.localValue = ""
        } else {
          this.cleave.setRawValue(this.modelValue)
          this.localValue = this.cleave.properties.result
        }
      } else {
        this.localValue = this.modelValue
      }
    }
  },
  watch: {
    modelValue(newValue: string) {
      if (this.cleave && (this.maskType !== MaskTypes.any || this.customCleaveOptions)) {
        if (newValue === "") {
          this.localValue = ""
        } else {
          this.cleave.setRawValue(newValue)
          this.$nextTick(() => {
            this.localValue = this.cleave!.properties.result
          })
        }
      } else {
        this.localValue = newValue
      }
    },
    customCleaveOptions() {
      this.setCleaveAndValue()
    },
    maskType() {
      this.setCleaveAndValue()
    }
  },
  mounted() {
    this.inputEl = this.$refs["bng-input"];
    this.setCleaveAndValue()
  }
})
</script>

<style scoped lang="scss">
.customInput {
  outline: none;
  box-shadow: none;
  @apply focus:shadow-none focus:ring-0 max-sm:text-sm w-full;
}
</style>
