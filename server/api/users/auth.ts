import { prisma } from "@/utils/prisma";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  if (event.method == "POST") {
    const { authorization } = await readBody(event);
    if (!authorization) {
      return {
        errors: ["Token não fornecido"],
      };
    }

    try {
      const token = authorization.split(" ")[1];
      const userVerified = jwt.verify(token, config.apiSecret);
      return {
        token,
      };
    } catch (error) {
      return {
        errors: ["Token Invalido"],
      };
    }
  }
});
