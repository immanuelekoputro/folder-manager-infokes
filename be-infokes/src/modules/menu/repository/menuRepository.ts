import { eq, isNull } from "drizzle-orm";
import { ResponseMenuList } from "../../../types/menu";
import { db } from "../../../database";
import { files } from "../../../database/schema";

export interface MenuRepositoryInterface {
  getMainMenuList(): Promise<ResponseMenuList>;
  fetchMenuByParentId(parentId: number): Promise<ResponseMenuList>;
}

function MenuRepository(): MenuRepositoryInterface {
  const getMainMenuList = async (): Promise<ResponseMenuList> => {
    const result = await db
      .select({
        id: files.id,
        name: files.name,
        parentId: files.parentId,
        isFolder: files.isFolder,
        mimeType: files.mimeType,
      })
      .from(files)
      .where(isNull(files.parentId));

    const data = result.map((row) => ({
      id: row.id,
      name: row.name,
      parentId: row.parentId,
      isFolder: row.isFolder,
      mimeType: row.mimeType,
    }));

    return {
      code: 200,
      message: "Success",
      data,
    };
  };

  const fetchMenuByParentId = async (
    parentId: number,
  ): Promise<ResponseMenuList> => {
    // Query file dengan parentId tertentu
    const result = await db
      .select({
        id: files.id,
        name: files.name,
        parentId: files.parentId,
        isFolder: files.isFolder,
        mimeType: files.mimeType,
      })
      .from(files)
      .where(eq(files.parentId, parentId));

    // Map ke tipe Menu
    const data = result.map((row) => ({
      id: row.id,
      name: row.name,
      parentId: row.parentId,
      isFolder: row.isFolder,
      mimeType: row.mimeType,
    }));

    return {
      code: 200,
      message: "Success",
      data,
    };
  };

  return { getMainMenuList, fetchMenuByParentId };
}

export default MenuRepository;
