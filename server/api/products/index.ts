import { prisma } from "@/utils/prisma";

export default defineEventHandler(async (event) => {
  const products = prisma.product.findMany();
  return products;
});
