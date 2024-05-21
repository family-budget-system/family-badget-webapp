<script setup lang="ts">

import BngDialog from "@/components/ui/BngDialog.vue";
import {Ref, ref} from "vue";
import BngTextField from "@/components/ui/BngTextField.vue";
import BngSelect from "@/components/ui/BngSelect.vue";
import {useRefsStore} from "@/stores/RefsStore.ts";
import {BillTypeEnum} from "@/@types/bills.types.ts";
import BngComboboxComponent from "@/components/ui/BngComboboxComponent.vue";
import BngButton from "@/components/ui/BngButton.vue";
import {BillModelForm} from "@/modules/accounts/@types";
import {CleaveRules} from "@/config/cleave-rules.ts";
import useVuelidate from "@vuelidate/core";
import {required} from "@/utils/i18n-validators.ts";
import {BillsService} from "@/services/bills.service.ts";

const refsStore = useRefsStore()

const dialog = ref(null)

const form: Ref<BillModelForm> = ref({
  title: "",
  billType: BillTypeEnum.CASH,
  currencyId: null,
  balance: "",
})

const rules = {
  title: { required },
  currencyId: { required },
  balance: { required },
}

const v$ = useVuelidate(rules, form)

const showDialog = () => {
  (dialog.value as any).showDialog()
}

const closeDialog = async () => {
  v$.value.$reset();
  resetForm();
  (dialog.value as any).closeDialog()
}

const resetForm = () => {
  form.value = {
    title: "",
    billType: BillTypeEnum.CASH,
    currencyId: null,
    balance: "",
  }
}

defineExpose({
  showDialog
})

const submit = async () => {
  await v$.value.$reset()
  if (!(await v$.value.$validate())) return

  await BillsService.saveNewBill({
    balance: form.value.balance,
    billType: form.value.billType,
    currencyId: form.value.currencyId,
    title: form.value.title,
  })
}
</script>

<template>
  <BngDialog card-classes="sm:min-w-[900px] max-sm:w-full" ref="dialog" title="Добавить карту, вклад, кредит">
    <div class="grid sm:grid-cols-2 gap-6 mb-6">
      <bng-text-field
        label="Название"
        placeholder="Введите название счёта"
        class="sm:col-span-2"
        v-model.trim="form.title"
        :error="v$.title.$error"
        :error-messages="v$.title.$errors"
      />

      <BngSelect
        label="Тип счёта"
        placeholder="Выберите тип счёта"
        :items="refsStore.billTypesRefs"
        item-value="value"
        item-text="name"
        v-model="form.billType"
      />

      <BngComboboxComponent
        label="Валюта"
        placeholder="Тип валюты"
        :items="refsStore.currencyRefs"
        item-value="id"
        item-text="value"
        v-model="form.currencyId"
        always-show-list
        :error="v$.currencyId.$error"
        :error-messages="v$.currencyId.$errors"
      />

      <bng-text-field
        label="Начальный баланс"
        placeholder="Введите изначальную сумму"
        :custom-cleave-options="CleaveRules.number"
        maxlength="18"
        v-model="form.balance"
        :error="v$.balance.$error"
        :error-messages="v$.balance.$errors"
      />
    </div>

    <div class="flex sm:justify-end max-sm:flex-col sm:gap-6 gap-3">
      <bng-button secondary outlined @click="closeDialog">Отмена</bng-button>
      <bng-button @click="submit">Создать</bng-button>
    </div>
  </BngDialog>
</template>

<style scoped>

</style>