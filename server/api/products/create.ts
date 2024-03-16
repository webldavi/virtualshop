import { prisma } from "@/utils/prisma";
import jwt from "jsonwebtoken";
import { useFetch } from "nuxt/app";
import { handleAuthorization, hasAllRequiredFields } from "~/utils/helpers";

type Body = {
  authorization: string;
  product: {
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
  };
};

export default defineEventHandler(async (event) => {
  if (event.method == "POST") {
    const body = await readBody(event);
    const requiredProductFields = [
      "name",
      "imageUrl",
      "description",
      "price",
      "stock",
      "categoryId", // Adicionando categoryId como campo obrigatório
    ];

    if (!body) {
      return {
        errors: ["O campo body é obrigatório"],
      };
    }

    const { authorization, product } : Body = body;
    if (!authorization) {
      return {
        errors: ["O campo `authorization` é obrigatório"],
      };
    }
    const { authorization: auth, authResponse } = await handleAuthorization(
      authorization
    );

    if (!auth) {
      return authResponse;
    }

    // check if product is not empty
    if (!product) {
      return {
        errors: ["Campo `product` é obrigatório"],
      };
    }

    // check if product have all required fields
    if (!hasAllRequiredFields(product, requiredProductFields)) {
      return {
        errors: [
          `Os campos ${requiredProductFields.join(", ")} são obrigatórios`,
        ],
      };
    }

    // Aqui você deve ter o categoryId da categoria desejada
    const category = await prisma.category.findUnique({
      where: {
        id: product.categoryId,
      },
    });

    if(!category){
      return {
        errors: [
          'Categoria não existente'
        ]
      }
    }
    const productWithCategory = {
      ...product,
      categoryId: category.id, // Incluindo categoryId no objeto product
    };

    const productCreated = await prisma.product.create({
      data: productWithCategory,
    });

    return productCreated;
  }
});
