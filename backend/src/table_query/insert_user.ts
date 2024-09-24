import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

interface UserParams {
  name: string;
  email: string;
  password: string;
}
async function insertUser(userDetails: UserParams) {
  try {
    const userexists = await prisma.user.findUnique({
      where: {
        email: userDetails.email,
      },
    });
    if (userexists) {
      return {
        message: "User already exits with this emai id",
      };
    }

    const res = await prisma.user.create({
      data: {
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export default insertUser;
