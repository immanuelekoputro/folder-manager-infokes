export interface MenuResponse {
  code: number;
  message: string;
  data: MenuResponseData[];
}

export interface MenuResponseData {
  id: number;
  name: string;
  parentId: number | null;
  isFolder: boolean;
  mimeType: string;
}

export const fetchMenu = async (id: number | null): Promise<MenuResponse> => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/menu${id !== null ? `/${id}` : ""}`);
    const data = await response.json();

    if (data.code !== 200) {
      return {
        code: 500,
        message: "Error fetching menu",
        data: [],
      };
    }

    return {
      code: 200,
      message: "Success",
      data: data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        parentId: item.parentId,
        isFolder: item.isFolder,
        mimeType: item.mimeType,
      })),
    };
  } catch (error) {
    console.error("Error fetching menu:", error);
    return {
      code: 500,
      message: "Error fetching menu",
      data: [],
    };
  }
};
