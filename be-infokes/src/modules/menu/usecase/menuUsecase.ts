import { ResponseMenuList } from "../../../types/menu";
import { MenuRepositoryInterface } from "../repository/menuRepository";

// Get Main Menu List
export interface MenuUsecaseInterface {
  getMainMenuList(): Promise<ResponseMenuList>;
  getMenuByParentId(parentId: number): Promise<ResponseMenuList>;
}

function MenuUsecase(
  menuRepository: MenuRepositoryInterface,
): MenuUsecaseInterface {
  const getMainMenuList = async (): Promise<ResponseMenuList> => {
    return await menuRepository.getMainMenuList();
  };

  const getMenuByParentId = async (parentId: number): Promise<ResponseMenuList> => {
    return await menuRepository.fetchMenuByParentId(parentId);
  };

  return { getMainMenuList, getMenuByParentId };
}

export default MenuUsecase;
