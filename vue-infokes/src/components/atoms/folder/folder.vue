<script lang="ts" setup>

const props = defineProps<{
  value: {
    id: number;
    name: string;
    mimeType: string;
  };
}>();
</script>

<template>
  <div class="flex flex-col items-center w-24 gap-1 cursor-pointer">
    <div class="h-24 w-24 bg-[#c8c8c8] rounded-lg flex items-center justify-center">
      <i class="pi pi-folder"></i>
    </div>
    <h2 class="text-xs">{{ value.name }}</h2>
  </div>
</template>