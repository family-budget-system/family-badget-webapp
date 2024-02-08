<template>
  <TransitionRoot appear as="template" :show="isOpen">
    <Dialog @close="!persistent ? closeDialog : setCardActive()" as="div" class="relative z-40">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <slot name="dialogPanel">
              <DialogPanel ref="dialogCard" class="card p-12 bg-white transform text-left transition-transform" :class="[cardClasses, { 'scale-110': cardActive }]">
                <div class="flex justify-between items-center mb-4 text-richBlack">
                  <h1 class="card-title text-left select-none">{{ title }}</h1>
                  <bng-icon v-if="!persistent" class="cursor-pointer" @click="closeDialog"><bng-close-icon /></bng-icon>
                </div>
                <div>
                  <slot></slot>
                </div>
              </DialogPanel>
            </slot>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Dialog, DialogDescription, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from "@headlessui/vue";
import {wait} from "@/utils";
import BngIcon from "@/components/ui/BngIcon.vue";
import BngCloseIcon from "@/assets/icons/BngCloseIcon.vue";

export default defineComponent({
  name: "BngDialog",
  components: {BngCloseIcon, BngIcon, TransitionChild, TransitionRoot, DialogDescription, DialogTitle, DialogPanel, Dialog},
  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    cardClasses: String,
    persistent: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    isOpen: false,
    cardActive: false,
  }),
  methods: {
    showDialog() {
      this.isOpen = true
    },
    closeDialog() {
      this.isOpen = false
    },
    async setCardActive() {
      this.cardActive = true
      await wait(200)
      this.cardActive = false
    }
  },
  mounted() {
    this.isOpen = this.modelValue
  },
  watch: {
    modelValue(value) {
      this.isOpen = value
    }
  }
})
</script>

<style lang="scss" scoped>

</style>

