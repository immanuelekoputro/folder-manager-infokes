import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { MenuRevampInterface } from "@/interface/interface";
import { fetchMenu as fetchMenuApi } from "@/services/menu.service";

export const useMenuStore = defineStore("menu", () => {
  const activeMenu = ref<MenuRevampInterface[] | null>(null);
  const mockMenu = ref<MenuRevampInterface[]>([]);
  const isOpenFile = ref(false);

  // fungsi untuk mengambol semua menu awal
  async function collectAllMenus(id: number | null): Promise<MenuRevampInterface[]> {
    const items = await fetchMenu(id);
    const result: MenuRevampInterface[] = [];
    for (const item of items) {
      item.isExpanded = true;
      result.push(item);
      if (item.isFolder) {
        const children = await collectAllMenus(item.id);
        const temp = children.map((child) => ({
          ...child,
          isExpanded: true,
        }));
        result.push(...temp);
      }
    }
    return result;
  }

  async function setMenuInitiate() {
    mockMenu.value = await collectAllMenus(null);
  }

  // fungsi untuk meminta data menu dari be
  async function fetchMenu(id: number | null): Promise<MenuRevampInterface[]> {
    const result = await fetchMenuApi(id);
    return result.data.map((item) => ({
      id: item.id,
      name: item.name,
      parentId: item.parentId,
      isExpanded: false,
      icon: "pi pi-file",
      isFolder: item.isFolder,
      mimeType: item.mimeType,
    }));
  }

  // fungsi untuk hapus child menu
  function removeChildMenu(parentId: number) {
    const children = mockMenu.value.filter((m) => m.parentId === parentId);
    for (const child of children) {
      child.isExpanded = false;
      removeChildMenu(child.id);
    }
    mockMenu.value = mockMenu.value.filter((m) => m.parentId !== parentId);
  }

  async function setActiveMenuMulti(
    menuId: number,
    isFromFolder: boolean = false,
  ): Promise<MenuRevampInterface[] | null> {
    const menu = mockMenu.value.find((m) => m.id === menuId);
    if (!menu) return null;

    if (!menu.isFolder) {
      openFile();
      return null;
    }

    const isExpanding = menu.isExpanded && isFromFolder ? true : !menu.isExpanded;

    menu.isExpanded = isExpanding;

    if (isExpanding) {
      // (1) Case jika akan membuka folder
      const children = (await fetchMenu(menuId)) ?? [];
      activeMenu.value = children;

      const temp = children.map((c) => c.id);

      // hapus dulu child yang sudah ada di mockMenu, karena akan di tambahkan lagi dengan data yang baru, jadi tidak terjadi duplikasi
      mockMenu.value = mockMenu.value.filter((m) => !temp.includes(m.id));

      // cari index parent, jadi children akan di masukan di setelah parent
      const parentIndex = mockMenu.value.findIndex((m) => m.id === menuId);
      return mockMenu.value.splice(parentIndex + 1, 0, ...children);
    } else {
      // (2) Case jika akan menutup folder

      // hapus secara langsung child dari parent yang di tutup
      removeChildMenu(menuId);

      // cari folder yang 1 line yang terbuka
      if (menu.parentId === null) {
        // (2.1) jika menu yang di tutup adalah root, maka cari sibling yang terbuka, jika tidak ada cari menu terakhir yang terbuka
        const sibling = mockMenu.value.find((m) => m.parentId === null && m.isExpanded);
        if (sibling) {
          return (activeMenu.value = (await fetchMenu(sibling.id)) ?? []);
        } else {
          const lastMenu = mockMenu.value.filter((m) => m.isExpanded);
          const lastMenuId = lastMenu[lastMenu.length - 1] ?? null;
          return (activeMenu.value = lastMenuId ? ((await fetchMenu(lastMenuId.id)) ?? []) : null);
        }
      } else {
        // (2.2) jika menu yang di tutup bukan root, maka cari sibling yang terbuka
        const sibling = mockMenu.value.find((m) => m.parentId === menu.parentId && m.isExpanded);
        if (sibling) {
          return (activeMenu.value = mockMenu.value.filter((m) => m.parentId === sibling.id) ?? []);
        } else {
          const parentMenu = mockMenu.value.find((m) => m.id === menu.parentId);
          if (parentMenu) {
            return (activeMenu.value = (await fetchMenu(parentMenu.id)) ?? []);
          }
          return [];
        }
      }
    }
  }

  function openFile() {
    isOpenFile.value = !isOpenFile.value;
  }

  return {
    activeMenu,
    mockMenu,
    setActiveMenuMulti,
    fetchMenu,
    setMenuInitiate,
    openFile,
    isOpenFile,
  };
});
