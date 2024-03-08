import { prisma } from "@/utils/prisma";
import jwt from "jsonwebtoken";
import { managerUser } from "~/services/api";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  if (event.method == "POST") {
    const { authorization } = await readBody(event);
    const authState = managerUser.auth(authorization)
    if("errors" in authState){
      return authState
    }

    const { id: userId } : any  = jwt.decode(authorization.split(' ')[1])

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select:{
        password: false,
        email: true,
        admin: true,
        createdAt: true,
        id: true,
        name: true
      }
    })
    console.log(user)
  }
});
