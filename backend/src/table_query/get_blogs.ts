import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

export async function getBlog(email: any) {
  // console.log(email);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const blogs = await prisma.post.findMany({
      where: {
        authorId: user?.id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
      },
    });
    // console.log(blogs);
    return blogs;
  } catch (error) {
    console.log(error);
    return {
      message: "something is wrong with the get blogs function",
    };
  }
}
export async function getblogId(blogid: string) {
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: blogid,
      },
      select: {
        title: true,
        content: true,
      },
    });
    return blog;
  } catch (error) {
    return {
      message: "something is wrong with the get blog by id function",
    };
  }
}

export async function getAllblogs() {
  try {
    const blog = await prisma.post.findMany();
    return blog;
  } catch (error) {
    console.log(error);
    return null;
  }
}
