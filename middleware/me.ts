import type { RouteMiddleware } from "#app";
import { useUserStore } from "../store/user";
export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
  const userStore = useUserStore();
  if (process.client) {
    userStore.getMe();
  }
});
