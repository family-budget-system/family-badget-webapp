<script lang="ts">
import {computed, defineComponent} from "vue";
import {useRoute} from "vue-router";
import EmptyLayout from "@/components/layouts/EmptyLayout.vue";
import MainLayout from "@/components/layouts/MainLayout.vue";
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import BngNotificationComponent from "@/components/ui/BngNotificationComponent.vue";
import {useRefsStore} from "@/stores/RefsStore.ts";

export default defineComponent({
  name: "App",
  components: {
    BngNotificationComponent,
    EmptyLayout,
    MainLayout,
    AuthLayout,
  },
  async mounted() {
    await useRefsStore().initRefs()
  },
  setup() {
    const route = useRoute()
    const layout = computed(() => (route.meta.layout || 'Empty') + '-layout')
    return {
      layout
    }
  }
})
</script>

<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>

    <div class="fixed right-4 top-4 max-md:top-2 max-md:right-2 z-50">
      <BngNotificationComponent />
    </div>
  </div>
</template>

<style scoped>

</style>
