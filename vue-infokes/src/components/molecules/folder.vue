<script lang="ts" setup>
import { useMenuStore } from '@/stores/menu';
import { watch } from "vue";

const menuStore = useMenuStore()

watch(
  () => menuStore.activeMenu,
  (newValue, oldValue) => {
    console.log('Active Menu changed from:', oldValue, 'to:', newValue);
  }
);
</script>

<template>
  <div v-if="!menuStore.activeMenu" class="h-full w-full border-dashed border-[5px] border-[#bfbfbf] rounded-lg flex justify-center items-center
}">
    Nothing shown, please select a folder
  </div>
  <div class="flex flex-col items-center w-24 gap-1" v-for="value in menuStore.activeMenu" :key="value.id">
    <div class="h-24 w-24 bg-[#c8c8c8] rounded-lg flex items-center justify-center">
      <i class="pi pi-folder"></i>
    </div>
    <h2 class="text-xs">{{ value.name }}</h2>
  </div>
</template>

<style scoped></style>