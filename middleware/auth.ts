import type { RouteMiddleware } from "#app";
import { managerUser } from "~/services/api";

export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
  if (process.client) {
    const response = await managerUser.auth("token " + managerToken.get())
    return response.authorization ? true : navigateTo("/login")
  }
});
