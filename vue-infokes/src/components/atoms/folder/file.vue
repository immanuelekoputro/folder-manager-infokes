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
    <div class="h-24 w-24 bg-[#e5e5e5] rounded-lg flex items-center justify-center">
      <i class="pi pi-file"></i>
    </div>
    <h2 class="text-xs">{{ value.name }} haha</h2>
  </div>
</template>