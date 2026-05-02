<script lang="ts" setup>
import { useMenuStore } from '@/stores/menu';
import File from '../atoms/folder/file.vue';
import Folder from '../atoms/folder/folder.vue';

const menuStore = useMenuStore()
</script>

<template>
  <div v-if="!menuStore.activeMenu" class="h-full w-full border-dashed border-[5px] border-[#bfbfbf] rounded-lg flex justify-center items-center
}">
    Nothing shown, please select a folder
  </div>
  <span v-else-if="menuStore.activeMenu?.length > 0" class="flex flex-row gap-4">
    <span v-for="value in menuStore.activeMenu" :key="value.id">
      <Folder @click="menuStore.setActiveMenuMulti(value.id, true)" v-if="value.isFolder" :value="value" />
      <File @click="menuStore.setActiveMenuMulti(value.id)" v-else :value="value" />
    </span>
  </span>
  <div v-else
    class="h-full w-full border-dashed border-[5px] border-[#bfbfbf] rounded-lg flex justify-center items-center">
    Folder is empty
  </div>
</template>

<style scoped></style>