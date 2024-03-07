import { prisma } from "~/utils/prisma";
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  if (event.method == "POST") {
    const { email, password } = await readBody(event);

    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
      select: {
        id: true,
      },
    });

    if (user?.id) {
      const token = jwt.sign(user, config.apiSecret, { expiresIn: "72h" });
      return {
        token,
      };
    } else {
      return {
        errors: ["Email ou Senha incorretos"],
      };
    }
  }
});
