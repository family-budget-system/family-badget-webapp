<template>
  <div class="observer py-2" />
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BngObserver",
  props: ['options'],
  data: () => ({
    observer: null as IntersectionObserver | null
  }),
  emits: ['intersect'],
  mounted() {
    const options = this.options || {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    }, options);
    this.observer.observe(this.$el);
  },
  unmounted() {
    this.observer?.disconnect();
  }
})
</script>


<style scoped lang="scss">

</style>
