<script setup lang="ts">

import BngIcon from "@/components/ui/BngIcon.vue";
import BngCashIcon from "@/assets/icons/BngCashIcon.vue";
</script>

<template>
  <div
    class="card card--white flex flex-col gap-6 hover:bg-lavenderLight transition-colors cursor-pointer"
  >
    <div class="flex justify-between items-center gap-6">
      <div class="flex gap-4 items-center text-richBlack">
        <bng-icon><bng-cash-icon /></bng-icon>
        <h3 class="card-title">Последние операции</h3>
      </div>
      <div></div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <div>Фотосалон</div>
        <div class="text-tuscanySolid">- 1 980,00 ₸</div>

      </div>
      <div class="flex justify-between items-center">
        <div>Никита Г.</div>
        <div class="text-laurelGreenSolid">+ 2 010,00 ₸</div>
      </div>
      <div class="flex justify-between items-center">
        <div>ALMATY-PARKING.KZ</div>
        <div class="text-tuscanySolid">- 965,00 ₸</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>