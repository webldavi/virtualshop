import { prisma } from "@/utils/prisma";
import { handleAuthorization, hasAllRequiredFields } from "~/utils/helpers";

export default defineEventHandler(async (event) => {
  if (event.method == "PUT") {
    const body = await readBody(event);
    const id = getRouterParam(event, "id");
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

    if (!id) {
      return {
        errors: ["O router param id é obrigatório"],
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

    try {
      const productUpdated = await prisma.product.update({
        data: product,
        where: {
          id: id,
        },
      });

      return productUpdated;
    } catch (error) {
      return {
        errors: ["Id do produto invalido"],
      };
    }
  }
});
