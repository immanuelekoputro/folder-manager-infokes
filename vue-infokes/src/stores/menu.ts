import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { MenuRevampInterface } from "@/interface/interface";
import { fetchMenu as fetchMenuApi } from "@/services/menu.service";

export const useMenuStore = defineStore("menu", () => {
  const activeMenu = ref<MenuRevampInterface[] | null>(null);
  const mockMenu = ref<MenuRevampInterface[]>([]);
  // const mockMenu1 = ref<MenuRevampInterface[]>([
  //   {
  //     id: 2,
  //     name: "Menu 2",
  //     icon: "pi pi-home",
  //     parentId: 1,
  //     isExpanded: false,
  //   },
  //   {
  //     id: 3,
  //     name: "Menu 3",
  //     icon: "pi pi-home",
  //     parentId: 1,
  //     isExpanded: false,
  //   },
  //   {
  //     id: 4,
  //     name: "Menu 4",
  //     icon: "pi pi-home",
  //     parentId: 1,
  //     isExpanded: false,
  //   },
  // ]);
  // const mockMenu2 = ref<MenuRevampInterface[]>([
  //   {
  //     id: 5,
  //     name: "Menu 5",
  //     icon: "pi pi-home",
  //     parentId: 2,
  //     isExpanded: false,
  //   },
  //   {
  //     id: 6,
  //     name: "Menu 6",
  //     icon: "pi pi-home",
  //     parentId: 2,
  //     isExpanded: false,
  //   },
  // ]);
  // const mockMenu5 = ref<MenuRevampInterface[]>([
  //   {
  //     id: 7,
  //     name: "Menu 7",
  //     icon: "pi pi-home",
  //     parentId: 5,
  //     isExpanded: false,
  //   },
  //   {
  //     id: 8,
  //     name: "Menu 8",
  //     icon: "pi pi-home",
  //     parentId: 5,
  //     isExpanded: false,
  //   },
  // ]);
  // const mockMenu3 = ref<MenuRevampInterface[]>([
  //   {
  //     id: 9,
  //     name: "Menu 9",
  //     icon: "pi pi-home",
  //     parentId: 3,
  //     isExpanded: false,
  //   },
  //   {
  //     id: 10,
  //     name: "Menu 10",
  //     icon: "pi pi-home",
  //     parentId: 3,
  //     isExpanded: false,
  //   },
  // ]);
  // const childrenMap: Record<number, MenuRevampInterface[]> = {
  //   1: mockMenu1.value,
  //   2: mockMenu2.value,
  //   3: mockMenu3.value,
  //   5: mockMenu5.value,
  // };

  const setMenuInitiate = async () => {
    const temp = await fetchMenu(null);
    mockMenu.value = temp.map((item) => ({
      id: item.id,
      name: item.name,
      parentId: item.parentId,
      isExpanded: false,
      icon: "pi pi-file",
      isFolder: item.isFolder,
      mimeType: item.mimeType,
    }));
  };

  const fetchMenu = async (id: number | null): Promise<MenuRevampInterface[]> => {
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
  };

  const removeDescendants = (parentId: number) => {
    const children = mockMenu.value.filter((m) => m.parentId === parentId);
    for (const child of children) {
      child.isExpanded = false;
      removeDescendants(child.id);
    }
    mockMenu.value = mockMenu.value.filter((m) => m.parentId !== parentId);
  };

  const setActiveMenuMulti = async (menuId: number): Promise<MenuRevampInterface[] | null> => {
    const menu = mockMenu.value.find((m) => m.id === menuId);
    if (!menu) return null;

    const isExpanding = !menu.isExpanded;
    menu.isExpanded = isExpanding;

    if (isExpanding) {
      const children = (await fetchMenu(menuId)) ?? [];
      activeMenu.value = children;
      const existingIds = mockMenu.value.map((m) => m.id);
      const newChildren = children.filter((c) => !existingIds.includes(c.id));
      const parentIndex = mockMenu.value.findIndex((m) => m.id === menuId);
      mockMenu.value.splice(parentIndex + 1, 0, ...newChildren);
      return children.map((item) => ({ ...item }));
    } else {
      removeDescendants(menuId);
      const lastMenu = mockMenu.value.filter((m) => m.isExpanded);
      const lastMenuId = lastMenu[lastMenu.length - 1] ?? null;
      activeMenu.value = lastMenuId ? ((await fetchMenu(lastMenuId.id)) ?? []) : null;
      return activeMenu.value ? activeMenu.value.map((item) => ({ ...item })) : null;
    }
  };

  const setActiveMenu = async (menuId: number): Promise<MenuRevampInterface[] | null> => {
    const menu = mockMenu.value.find((m) => m.id === menuId);
    if (!menu) return null;

    const siblingsToClose = mockMenu.value.filter(
      (m) => m.isExpanded && m.parentId === menu.parentId && m.id !== menuId,
    );
    siblingsToClose.forEach((m) => {
      m.isExpanded = false;
      removeDescendants(m.id);
    });

    const isExpanding = !menu.isExpanded;
    menu.isExpanded = isExpanding;

    if (isExpanding) {
      // sisipkan children
      const children = (await fetchMenu(menuId)) ?? [];
      activeMenu.value = children; // update active menu dengan children yang baru
      const existingIds = mockMenu.value.map((m) => m.id);
      const newChildren = children.filter((c) => !existingIds.includes(c.id));
      const parentIndex = mockMenu.value.findIndex((m) => m.id === menuId);
      mockMenu.value.splice(parentIndex + 1, 0, ...newChildren);
      return children.map((item) => ({ ...item }));
    } else {
      // tutup menu collapse
      removeDescendants(menuId);

      // Untuk mencari menu yang masih expanded setelah menutup menu children
      const lastMenu = mockMenu.value.filter((m) => m.isExpanded);
      const lastMenuId = lastMenu[lastMenu.length - 1] ?? null;
      activeMenu.value = lastMenuId ? ((await fetchMenu(lastMenuId.id)) ?? []) : null;
      return activeMenu.value ? activeMenu.value.map((item) => ({ ...item })) : null;
    }
  };

  return {
    activeMenu,
    setActiveMenu,
    setActiveMenuMulti,
    mockMenu,
    fetchMenu,
    setMenuInitiate,
  };
});
