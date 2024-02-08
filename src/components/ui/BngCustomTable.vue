<script setup lang="ts">
import {computed, PropType, ref, Ref} from "vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import BngChevronIcon from "@/assets/icons/BngChevronIcon.vue";

export interface TableHeaderType {
  text: string,
  value: string,
  class?: string,
  align?: "left" | "center" | "end",
}

export type TableItemType = Record<string, any>

const props = defineProps({
  headers: {
    type: Object as PropType<TableHeaderType[]>,
    required: true,
  },
  items: {
    type: Object as PropType<TableItemType[]>,
    required: true,
  },
  expand: {
    type: Boolean,
    default: false,
  },
  expandOnRow: {
    type: Boolean,
    default: false,
  }
})

const headersComputed = computed(() => {
  return props.headers?.map((header) => {
    if (!header.align) header.align = "left"
    return header
  })
})

const expandedRows: Ref<number[]> = ref([])

const expandRowClick = (rowIndex: number) => {
  if (expandedRows.value.includes(rowIndex)) {
    expandedRows.value.splice(expandedRows.value.findIndex((item) => item === rowIndex), 1)
  } else {
    expandedRows.value.push(rowIndex)
  }
}
</script>

<template>
  <table class="table-auto family-open-sans">
    <thead>
      <tr>
        <th
          v-for="(header, index) of headersComputed"
          :key="index"
          class="font-normal text-xs p-3"
          :class="[`text-${header.align}`, header?.class]"
        >{{ header.text }}</th>
      </tr>
    </thead>
    <tbody class="text-base text-richBlack border-none rounded-3xl">
      <template v-for="(item, rowIndex) in items" :key="rowIndex">
        <tr
          class="hover:bg-lavender rounded-t-xl"
          :class="{ 'border-b-none bg-ghostWhite p-3': expandedRows.includes(rowIndex), 'border-b-[1px] border-lavender': !expandedRows.includes(rowIndex) }"
          @click="() => expandOnRow && expandRowClick(rowIndex)"
        >
          <slot name="item" :item="item" class="p-3">
            <td
              v-for="(value, colIndex) in Object.values(item)"
              :key="colIndex"
              :class="`text-${headersComputed[colIndex].align}`"
            >
              {{ value }}
            </td>
          </slot>
          <td v-if="expand" class="text-center">
            <bng-icon
              @click.stop="expandRowClick(rowIndex)"
              class="cursor-pointer transition-transform"
              :class="{ 'rotate-180': !expandedRows.includes(rowIndex) }"
            ><bng-chevron-icon /></bng-icon>
          </td>
        </tr>
        <tr v-if="expandedRows.includes(rowIndex)" class="border-b-[1px] border-lavender">
          <td class="p-0" :colspan="headersComputed.length + (expand ? 1 : 0)">
            <div class="bg-ghostWhite rounded-b-xl p-3">
              <div class="mb-3 h-[1px] bg-lavender"></div>
              <slot name="expand" :item="item"></slot>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
</style>