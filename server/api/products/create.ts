import { prisma } from "@/utils/prisma";
import jwt from "jsonwebtoken";
import { useFetch } from "nuxt/app";
import { handleAuthorization, hasAllRequiredFields } from "~/utils/helpers";

export default defineEventHandler(async (event) => {
  if (event.method == "POST") {
    const body = await readBody(event);
    const requiredProductFields = [
      "name",
      "imageUrl",
      "description",
      "price",
      "stock",
    ];

    if (!body) {
      return {
        errors: ["O campo body é obrigatório"],
      };
    }

    const { authorization, product } = body;
    if (!authorization) {
      return {
        errors: ["O campo `authorization` é obigatório"],
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

    const productCreated = await prisma.product.create({
      data: product,
    });

    return productCreated;
  }
});
