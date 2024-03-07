import { prisma } from "@/utils/prisma";
import { handleAuthorization } from "~/utils/helpers";

export default defineEventHandler(async (event) => {
  if (event.method == "DELETE") {
    const body = await readBody(event);
    const id = getRouterParam(event, "id");

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
    const { authorization } = body;
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
    try {
      const productDeleted = await prisma.product.delete({
        where: {
          id: id,
        },
      });

      return productDeleted;
    } catch (error) {
      return {
        errors: ["Id do produto invalido"],
      };
    }
  }
});
