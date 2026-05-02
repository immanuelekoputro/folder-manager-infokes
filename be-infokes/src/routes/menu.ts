import Elysia from "elysia";
import MenuRepository from "../modules/menu/repository/menuRepository";
import MenuUsecase from "../modules/menu/usecase/menuUsecase";
import MenuHandler from "../modules/menu/handler/menuHandler";
import { ResponseMenuList } from "../types/menu";

const menuRepository = MenuRepository();
const menuUsecase = MenuUsecase(menuRepository);
const { getMainMenuListHandler, getMenuByParentIdHandler } =
  MenuHandler(menuUsecase);

export const menuRoutes = new Elysia().group("/menu", (app) =>
  app
    .get("/", async () => {
      return await getMainMenuListHandler();
    })
    .get("/:id", async ({ params }) => {
      const parentId = parseInt(params.id);
      const response: ResponseMenuList =
        await getMenuByParentIdHandler(parentId);
      return response;
    }),
);
