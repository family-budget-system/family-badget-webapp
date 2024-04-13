import axios, {AxiosError} from "axios";
import {TokenService} from "@/token.service.ts";
import {useNotificationStore} from "@/stores/NotificationStore.ts";
import {useRouter} from "vue-router";


const Api = axios.create();

Api.interceptors.request.use(async (config) => {
  if (TokenService.tokens.accessToken) {
    config.headers["Authorization"] = `Bearer ${TokenService.tokens.accessToken}`;
  }
  return config;
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const getDataMessage = async (error: AxiosError) => {
      return (error.response as any).data.message;
    };

    let message = await getDataMessage(error);
    if (!message) {
      message = "Произошла ошибка";
    }

    const res = error.response;

    const router = useRouter()

    if (res) {
      const notificationStore = useNotificationStore()
      switch (res.status) {
        case 400:
          notificationStore.setNotification({ message, color: "error" })
          break;
        case 401:
          if (message) {
            notificationStore.setNotification({ message, color: "error" })
          }
          TokenService.clearTokens()
          await router.push({ name: "login" })
          break;
        case 404:
          notificationStore.setNotification({ message, color: "error" })
          break;
        case 500:
          notificationStore.setNotification({ message, color: "error" })
          break;
        case 502:
        case 503:
          break;
      }
    } else if (error.message) {
      message = error.message;
    }
    return Promise.reject(error);
  },
);

export {
  Api
}