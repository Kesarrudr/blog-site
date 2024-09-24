import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

export async function deleteBlogId(id: string) {
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
      },
    });
    if (!blog) {
      return null;
    } else {
      await prisma.post.delete({
        where: {
          id,
        },
      });
      return blog;
    }
  } catch (error) {
    throw error;
  }
}
