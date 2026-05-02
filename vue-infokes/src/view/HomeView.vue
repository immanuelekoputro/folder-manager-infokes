<script setup lang="ts">
import Folder from '@/components/molecules/folder.vue';
import { useMenuStore } from '@/stores/menu';
import { onMounted } from 'vue';
const menuStore = useMenuStore()

onMounted(() => {
  menuStore.setMenuInitiate();
});

// Hitung kedalaman node berdasarkan parentId secara rekursif
const getDepth = (parentId: number | null): number => {
  if (!parentId) return 0;
  const parent = menuStore.mockMenu.find((m) => m.id === parentId);
  if (!parent) return 0;
  return 1 + getDepth(parent.parentId);
};

</script>

<template>
  <div class="grid grid-cols-4 m-0">
    <!-- Left Section for show folder -->
    <section class="bg-[#bdbdbd] h-screen w-full p-4">
      <div class="flex flex-col gap-1">
        <span v-for="value in menuStore.mockMenu" :key="value.id">
          <div v-if="value.isFolder"
            class="flex flex-row justify-start bg-[#3996c5] hover:bg-[#0077b2] py-2 px-4 rounded-lg cursor-pointer"
            :style="{ marginLeft: `${getDepth(value.parentId) * 16}px` }" @click="menuStore.setActiveMenu(value.id)">
            <i :class="`pi ${value.isExpanded ? 'pi-folder-open' : 'pi-folder'} text-md text-[#d9d9d9]`"></i>
            <span class="text-white ml-2 text-sm">{{ value.name }}</span>
          </div>
          <div v-else class="flex flex-row items-center justify-start py-2 px-4 cursor-pointer"
            :style="{ marginLeft: `${getDepth(value.parentId) * 16}px` }" @click="menuStore.setActiveMenu(value.id)">
            <i :class="`pi pi-file text-md text-[#494949]`"></i>
            <span class="text-[#494949] ml-2 text-sm">{{ value.name.replaceAll(' ', '_') }}.{{ value.mimeType }}</span>
          </div>
        </span>

      </div>
    </section>
    <!-- Right Section for show content selected -->
    <section class="col-span-3 bg-[#dadada] h-screen w-full p-4 flex flex-row gap-4">
      <Folder />
    </section>

    <!-- Modal Section -->
    <!-- <div class="fixed inset-0 bg-[#1c1c1c34] flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-xl font-bold mb-4">Create New Folder</h2>
      </div>
    </div> -->
  </div>
</template>

<style scoped></style>
