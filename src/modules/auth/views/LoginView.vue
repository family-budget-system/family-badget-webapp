<script setup lang="ts">
import BngTextField from "@/components/ui/BngTextField.vue";
import {InputTypes} from "@/@types/input.types.ts";
import BngButton from "@/components/ui/BngButton.vue";
</script>

<template>
  <div class="card card--white max-sm:px-3 max-sm:py-6 max-sm:w-full sm:p-12 sm:min-w-[600px]">
    <div class="title mb-6">Авторизация</div>

    <div class="mb-24">
      <div class="flex flex-col gap-6 mb-2">
        <bng-text-field
          label="Электронная почта"
          placeholder="Введите электронную почту"

        />

        <bng-text-field
          label="Пароль"
          placeholder="Введите пароль"
          :input-type="InputTypes.password"
        />
      </div>
      <div class="flex justify-end items-center">
        <a class="blue-link text-sm max-sm:text-xs" href="">Забыли пароль?</a>
      </div>
    </div>

    <div class="max-sm:flex-col max-sm:gap-6 flex justify-between">
      <bng-button @click="$router.push({ name: 'registration' })" secondary outlined>Зарегистрироваться</bng-button>
      <bng-button>Войти</bng-button>
    </div>

  </div>
</template>

<style scoped>

</style>