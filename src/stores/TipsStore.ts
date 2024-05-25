import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useTipsStore = defineStore("tipsStore", () => {
  const operationTips = ref([
    { componentName: "AddAccountTip", show: false },
  ])

  const visibleOperationTips = computed(() => operationTips.value.filter(tip => tip.show))

  const changeVisibleOperationTip = (componentName: string, show: boolean) => {
    operationTips.value.find(tip => tip.componentName === componentName)!.show = show
  }

  return {
    operationTips,
    visibleOperationTips,

    changeVisibleOperationTip
  }
})