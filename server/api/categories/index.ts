import { prisma } from "@/utils/prisma";

export default defineEventHandler(async (event) => {
  const categories = prisma.category.findMany()
  return categories
});
