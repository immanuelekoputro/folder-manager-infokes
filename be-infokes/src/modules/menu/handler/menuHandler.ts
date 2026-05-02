import { ResponseMenuList } from "../../../types/menu";
import { MenuUsecaseInterface } from "../usecase/menuUsecase";

export interface MenuHandlerInterface {
  getMainMenuListHandler(): Promise<ResponseMenuList>;
  getMenuByParentIdHandler(parentId: number): Promise<ResponseMenuList>;
}

function MenuHandler(menuUsecase: MenuUsecaseInterface): MenuHandlerInterface {
  const getMainMenuListHandler = async (): Promise<ResponseMenuList> => {
    try {
      return await menuUsecase.getMainMenuList();
    } catch (error) {
      return {
        code: 500,
        message: "Internal Server Error",
        data: [],
      };
    }
  };

  const getMenuByParentIdHandler = async (
    parentId: number,
  ): Promise<ResponseMenuList> => {
    try {
      return await menuUsecase.getMenuByParentId(parentId);
    } catch (error) {
      return {
        code: 500,
        message: "Internal Server Error",
        data: [],
      };
    }
  };

  return { getMainMenuListHandler, getMenuByParentIdHandler };
}

export default MenuHandler;
