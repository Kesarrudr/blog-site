import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { createBlogInput } from "@kesarrudr/blogsite-common";
const prisma = new PrismaClient().$extends(withAccelerate());
interface blogPrams {
  title: string;
  content: string;
}
async function createblog({ title, content }: blogPrams, c: Context) {
  try {
    const { success } = createBlogInput.safeParse({ title, content });
    if (success) {
      interface Mytoken {
        email: string;
        password: string;
      }
      const token = c.req.header("Authorization");
      if (token) {
        const payload = jwt.decode<Mytoken>(token);
        const email = payload.payload?.email;
        const result = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        const userId: any = result?.id;
        const newblog = await prisma.post.create({
          data: {
            authorId: userId,
            title: title,
            content: content,
          },
          select: {
            id: true,
            title: true,
            content: true,
          },
        });
        return newblog;
      } else {
        c.status(411);
        return c.json({
          message: "invalid inputs",
        });
      }
    }
  } catch (error) {
    return c.json(
      {
        message: "something is wrong with the createblog middleware",
      },
      { status: 500 },
    );
  }
}

export default createblog;
