import { Hono, Context } from "hono";
import verifyUser from "../middlewares/verify";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { getAllblogs, getBlog, getblogId } from "../table_query/get_blogs";
import createblog from "../table_query/create_blog";
import { changeblog } from "../table_query/change_blog";
import { deleteBlogId } from "../table_query/delete_blog";

export const postRouter = new Hono();

postRouter.get("/", verifyUser, async (c) => {
  try {
    interface Mytoken {
      email: string;
      password: string;
    }
    const token = c.req.header("Authorization");
    // console.log(token);
    if (token) {
      const payload = jwt.decode<Mytoken>(token);
      const email = payload.payload?.email;
      // console.log(email);
      const blogs = await getBlog(email);
      return c.json(
        {
          Message: "You blogs: ",
          blogs,
        },
        { status: 200 },
      );
    }
  } catch (error) {
    return c.json(
      {
        message: "something is wrong with /posts route",
      },
      { status: 500 },
    );
  }
});

postRouter.post("/", verifyUser, async (c: Context) => {
  try {
    //TODO: add body check that user only sends the required body.
    interface bodytype {
      title: string;
      content: string;
    }
    const { title, content }: bodytype = await c.req.json();
    // console.log(title);
    // console.log(content);
    const result = await createblog({ title, content }, c);
    // console.log(result);
    return c.json({
      message: "your new blog created ",
      result,
    });
  } catch (error) {
    console.error(error);
    return c.json({ message: "An error occurred while creating the post." });
  }
});
postRouter.get("/bulk", verifyUser, async (c) => {
  try {
    const blogs = await getAllblogs();
    if (blogs) {
      return c.json({
        blogs,
      });
    } else {
      return c.json({
        message: "no blog found",
      });
    }
  } catch (error) {
    return c.json({
      message: "something wrong with the /bulk route",
    });
  }
});
postRouter.get("/:id", verifyUser, async (c: Context) => {
  try {
    const id = c.req.param("id");
    const blog = await getblogId(id);
    if (!blog) {
      return c.json({
        message: "no blog found with this id ",
      });
    }
    return c.json(
      {
        blog,
      },
      { status: 200 },
    );
  } catch (error) {
    return c.json({
      message: "something is wrong with the /posts route for get blog by id",
    });
  }
});

postRouter.put("/:id", verifyUser, async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body: {
      title?: string;
      content?: string;
    } = await c.req.json();
    const { title, content } = body;
    await changeblog({ id, title, content });
    return c.json({
      body,
    });
  } catch (error) {
    return c.json({
      message: "wrong with the /posts/:id route",
    });
  }
});

postRouter.delete("/:id", verifyUser, async (c: Context) => {
  try {
    const id = c.req.param("id");
    const blog = await deleteBlogId(id);
    console.log(blog);
    if (!blog) {
      return c.json(
        {
          message: "no blog found with this blog id",
        },
        {
          status: 404,
        },
      );
    } else {
      return c.json({
        message: " the following blog has been deleted successful",
        blog,
      });
    }
  } catch (error) {
    return c.json({
      message: "some is wrong with the /delete post route",
    });
  }
});
