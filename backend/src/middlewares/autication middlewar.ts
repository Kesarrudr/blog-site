import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Next } from "hono";
import { signinschema } from "@kesarrudr/blogsite-common";
const prisma = new PrismaClient().$extends(withAccelerate());

async function userauth(c: Context, next: Next) {
  try {
    const { email, password } = await c.req.json();
    const { success } = signinschema.safeParse({ email, password });
    if (success) {
      const result = await prisma.user.findUnique({
        where: {
          email: email,
          password: password,
        },
      });
      if (result) {
        await next();
      } else {
        return c.json(
          {
            message:
              "No users found with this email and password in the database",
          },
          { status: 200 },
        );
      }
    } else {
      return c.json({
        message: "Inputs not correct",
      });
    }
  } catch (error) {
    return c.json({
      message: "something is wrong with the authication middle ware",
      error,
    });
  }
}

export default userauth;
