import type { RouteMiddleware } from "#app";
import { useProductsStore } from "~/store/products";

export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
  const productStore = useProductsStore()
  if (process.client) {
    productStore.getAllProducts()
  }
});
