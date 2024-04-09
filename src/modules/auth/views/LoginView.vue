<script setup lang="ts">
import BngTextField from "@/components/ui/BngTextField.vue";
import {InputTypes} from "@/@types/input.types.ts";
import BngButton from "@/components/ui/BngButton.vue";
</script>

<template>
  <div class="card card--white p-12 min-w-[600px]">
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
        <a class="blue-link text-sm" href="">Забыли пароль?</a>
      </div>
    </div>

    <div class="flex justify-end">
      <bng-button>Авторизоваться</bng-button>
    </div>

  </div>
</template>

<style scoped>

</style>