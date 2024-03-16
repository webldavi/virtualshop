import { prisma } from "@/utils/prisma";
import { handleAuthorization, hasAllRequiredFields } from "~/utils/helpers";

export default defineEventHandler(async (event) => {
  if (event.method == "POST") {
    const body = await readBody(event);
    const requiredCategoryFields = [
      "name",
      "description",
    ];

    if (!body) {
      return {
        errors: ["O campo body é obrigatório"],
      };
    }

    const { authorization, category } = body;
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
    // check if category is not empty
    if (!category) {
      return {
        errors: ["Campo `category` é obrigatório"],
      };
    }

    // check if category have all required fields
    if (!hasAllRequiredFields(category, requiredCategoryFields)) {
      return {
        errors: [
          `Os campos ${requiredCategoryFields.join(", ")} são obrigatórios`,
        ],
      };
    }

    const categoryCreated = await prisma.category.create({
      data: category,
    });

    return categoryCreated;
  }
});
