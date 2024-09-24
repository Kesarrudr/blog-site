import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { updateBlogInput } from "@kesarrudr/blogsite-common";
const prisma = new PrismaClient().$extends(withAccelerate());

interface blogParams {
  id: string;
  title?: string;
  content?: string;
}

export async function changeblog({ id, title, content }: blogParams) {
  try {
    const { success } = updateBlogInput.safeParse({ id, title, content });
    if (success) {
      const updatedblog = await prisma.post.findUnique({
        where: {
          id,
        },
      });
      if (!updatedblog) {
        return {
          message: "no blog found with this id",
        };
      }
      if (title) {
        await prisma.post.update({
          where: {
            id,
          },
          data: {
            title,
          },
        });
      }
      if (content) {
        await prisma.post.update({
          where: {
            id,
          },
          data: {
            content,
          },
        });
      }
      return {
        message: "blog has been update successfully",
      };
    } else {
      return null;
    }
  } catch (error) {
    return {
      message: "wrong the update blog function",
    };
  }
}
