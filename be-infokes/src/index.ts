import { Elysia } from "elysia";
import { cors } from "@elysia/cors";
import { menuRoutes } from "./routes/menu";

const app = new Elysia({
  prefix: "/api/v1",
})
  .use(menuRoutes)
  .use(cors())
  .onError(({ code, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        status: 404,
        message: "Oops! Halaman yang Anda cari tidak ditemukan.",
        data: null,
      };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
