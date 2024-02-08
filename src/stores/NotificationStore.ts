import {defineStore} from "pinia";
import type {Ref} from "vue";
import {ref} from "vue";

export interface NotificationType {
  message: string,
  color?: "warning" | "success" | "error",
  delay?: number,
}

export const useNotificationStore = defineStore("notifications", () => {
  const notifications: Ref<NotificationType[]> = ref([]);

  const setNotification = (notification: NotificationType) => {
    const options:NotificationType = {
      message: notification.message,
    }
    options.color = notification.color ?? "warning";
    options.delay = notification.delay ?? 5000;

    notifications.value.push(options);

    const idx = notifications.value.length - 1;

    setTimeout(() => {
      notifications.value[idx] = null as any;
    }, options.delay)
  }

  const clearNotification = (idx: number) => {
    notifications.value[idx] = null as any;
  }

  return {
    notifications,

    setNotification,
    clearNotification,
  }
})