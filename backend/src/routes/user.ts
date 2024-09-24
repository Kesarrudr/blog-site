import { Hono } from "hono";
import uservalidation from "../middlewares/input_user_validaton";
import insertuser from "../table_query/insert_user";
import userauth from "../middlewares/autication middlewar";
import tokengenereate from "../token";

export const userRouter = new Hono();

userRouter.post("/signup", uservalidation, async (c) => {
  try {
    const { name, email, password } = await c.req.json();
    // const result =
    await insertuser({ name, email, password });
    const token = await tokengenereate(email, password);
    return c.json(
      { message: "signup successful", name, email, password, token: token },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return c.json({ error }, { status: 500 });
  }
});

userRouter.post("/signin", userauth, async (c) => {
  try {
    const { email, password } = await c.req.json();
    const token = await tokengenereate(email, password);
    return c.json({ token: token }, { status: 200 });
  } catch (error) {
    return c.json({ error }, { status: 404 });
  }
});
