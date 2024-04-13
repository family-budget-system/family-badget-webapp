<script setup lang="ts">
import BngTextField from "@/components/ui/BngTextField.vue";
import {InputTypes} from "@/@types/input.types.ts";
import BngButton from "@/components/ui/BngButton.vue";
import {ref} from "vue";
import {AuthService} from "@/services/web-api/auth.service.ts";
import {TokenService} from "@/token.service.ts";
import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";
import {useNotificationStore} from "@/stores/NotificationStore.ts";
import {wait} from "@/utils";
import {useRouter} from "vue-router";

const form = ref({
  email: "",
  password: "",
})

const rules = {
  email: { required: helpers.withMessage("Обязательное поле", required) },
  password: { required: helpers.withMessage("Обязательное поле", required) }
}

const v$ = useVuelidate(rules, form)
const router = useRouter()

const login = async () => {
  if (!(await v$.value.$validate())) return

  const result = await AuthService.login(form.value)

  useNotificationStore().setNotification({
    message: "Вы вошли, добро пожаловать!",
    color: "success"
  })

  TokenService.saveTokens({
    access_token: result.token
  })

  router.push({ name: 'home' })
}
</script>

<template>
  <div class="card card--white max-sm:px-3 max-sm:py-6 max-sm:w-full sm:p-12 sm:min-w-[600px]">
    <div class="title mb-6">Авторизация</div>

    <div class="mb-24">
      <div class="flex flex-col gap-6 mb-2">
        <bng-text-field
          label="Электронная почта"
          placeholder="Введите электронную почту"
          v-model="form.email"
          :error="v$.email.$error"
          :error-messages="v$.email.$errors"
        />

        <bng-text-field
          label="Пароль"
          placeholder="Введите пароль"
          :input-type="InputTypes.password"
          v-model="form.password"
          :error="v$.password.$error"
          :error-messages="v$.password.$errors"
        />
      </div>
      <div class="flex justify-end items-center">
        <a class="blue-link text-sm max-sm:text-xs" href="">Забыли пароль?</a>
      </div>
    </div>

    <div class="max-sm:flex-col max-sm:gap-6 flex justify-between">
      <bng-button @click="$router.push({ name: 'registration' })" secondary outlined>Зарегистрироваться</bng-button>
      <bng-button @click="login">Войти</bng-button>
    </div>

  </div>
</template>

<style scoped>

</style>