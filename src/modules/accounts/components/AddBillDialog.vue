<script setup lang="ts">

import BngDialog from "@/components/ui/BngDialog.vue";
import {ref} from "vue";
import BngTextField from "@/components/ui/BngTextField.vue";
import BngSelect from "@/components/ui/BngSelect.vue";
import {useRefsStore} from "@/stores/RefsStore.ts";
import {BillTypeEnum} from "@/@types/bills.types.ts";
import BngComboboxComponent from "@/components/ui/BngComboboxComponent.vue";
import BngButton from "@/components/ui/BngButton.vue";

const refsStore = useRefsStore()

const dialog = ref(null)

const form = ref({
  currency: BillTypeEnum.CASH
})

const showDialog = () => {
  (dialog.value as any).showDialog()
}

const closeDialog = () => {
  (dialog.value as any).closeDialog()
}

defineExpose({
  showDialog
})
</script>

<template>
  <BngDialog card-classes="sm:min-w-[900px] max-sm:w-full" ref="dialog" title="Добавить карту, вклад, кредит">
    <div class="grid sm:grid-cols-2 gap-6 mb-6">
      <bng-text-field
        label="Название"
        placeholder="Введите название счёта (не обязательно)"
        class="sm:col-span-2"
      />

      <BngSelect
        label="Тип счёта"
        placeholder="Выберите тип счёта"
        :items="refsStore.billTypesRefs"
        item-value="value"
        item-text="name"
      />

      <BngComboboxComponent
        label="Валюта"
        placeholder="Тип валюты"
        :items="refsStore.billTypesRefs"
        item-value="value"
        item-text="name"
        v-model="form.currency"
        always-show-list
      />

      <bng-text-field
        label="Начальный баланс"
        placeholder="Введите изначальную сумму"
      />
    </div>

    <div class="flex sm:justify-end max-sm:flex-col sm:gap-6 gap-3">
      <bng-button secondary outlined @click="closeDialog">Отмена</bng-button>
      <bng-button>Создать</bng-button>
    </div>
  </BngDialog>
</template>

<style scoped>

</style>