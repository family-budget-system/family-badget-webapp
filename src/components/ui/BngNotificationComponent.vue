<script setup lang="ts">

import BngCheckIcon from "@/assets/icons/BngCheckIcon.vue";
import BngIcon from "@/components/ui/BngIcon.vue";
import BngXIcon from "@/assets/icons/BngXIcon.vue";
import BngWarningIcon from "@/assets/icons/BngWarningIcon.vue";
import {useNotificationStore} from "@/stores/NotificationStore.ts";
import {computed} from "vue";

const notificationStore = useNotificationStore()
const notifications = computed(() => notificationStore.notifications)
</script>

<template>
  <div v-for="(notification, i) of notifications" :key="i">
    <transition name="fade">
      <div
        v-if="notification"
        class="alert-wrapper"
        :class="notification.color"
      >
        <div class="flex items-center gap-3 text-richBlack">
          <div :class="`${notification.color}--text`">
            <bng-icon v-if="notification.color === 'success'"><bng-check-icon /></bng-icon>
            <bng-icon v-else-if="notification.color === 'error'"><bng-x-icon /></bng-icon>
            <bng-icon v-else><bng-warning-icon /></bng-icon>
          </div>
          <div class="text-sm mr-2">{{ notification.message }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.alert-wrapper {
  @apply bg-slate-50 bg-opacity-90 rounded-3xl p-6 min-w-[350px] max-w-[440px] border;
}

.error {
  @apply border-red-600;
  &--text {
    @apply text-red-600;
  }
}

.warning {
  @apply border-blue-400;
  &--text {
    @apply text-blue-400;
  }
}

.success {
  @apply border-lime-600;
  &--text {
    @apply text-lime-600;
  }
}
</style>