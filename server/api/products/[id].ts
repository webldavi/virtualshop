import { prisma } from "@/utils/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if(!id){
    return {
      errors: ['O router param id é obrigatório']
    }
  }
  const products = prisma.product.findMany({
    where:{
      id
    }
  });
  return products;
});
