<script setup lang="ts">

import BngButton from "@/components/ui/BngButton.vue";
import BngTextField from "@/components/ui/BngTextField.vue";
import {InputTypes} from "@/@types/input.types.ts";
import BngInfoCircleIcon from "@/assets/icons/BngInfoCircleIcon.vue";
import BngIcon from "@/components/ui/BngIcon.vue";
</script>

<template>
  <div class="card card--white max-sm:px-3 max-sm:py-6 max-sm:w-full sm:p-12 sm:max-w-[600px]">
    <div class="title mb-6">Регистрация</div>

    <div class="flex flex-col gap-6 mb-24">
      <div>
        <bng-text-field
          class="mb-3"
          label="Электронная почта"
          placeholder="Введите электронную почту"
        />
        <div class="flex gap-3 items-center">
          <div><bng-icon><bng-info-circle-icon /></bng-icon></div>
          <div class="text-base text-darkElectricBlue">После регистрации с данной электронной почтой, Вы сможете авторизоваться в системе</div>
        </div>

      </div>

      <bng-text-field
        label="Придумайте пароль"
        placeholder="Придумайте пароль"
        :input-type="InputTypes.password"
      />

      <bng-text-field
        label="Повторите пароль"
        placeholder="Повторите пароль"
        :input-type="InputTypes.password"
      />

      <div class="flex gap-3 items-center">
        <div><bng-icon><bng-info-circle-icon /></bng-icon></div>
        <div class="text-base">Не менее 8 знаков на латинице, включать минимум одну заглавную и одну строчную буквы, цифры и специальные символы</div>
      </div>
    </div>

    <div class="max-sm:flex-col max-sm:gap-6 flex justify-between">
      <bng-button @click="$router.push({ name: 'login' })" secondary outlined>Войти</bng-button>
      <bng-button>Зарегистрироваться</bng-button>
    </div>
  </div>
</template>

<style scoped>

</style>