import { Context, Next } from "hono";
import { signupschema } from "@kesarrudr/blogsite-common";
async function uservalidation(c: Context, next: Next) {
  try {
    const requestBody = await c.req.json();
    const userDetails = requestBody;
    // console.log(userDetails);userdetails
    const result = signupschema.safeParse(userDetails);
    // console.log(result);
    if (result.success) {
      await next();
    } else {
      return c.json({
        message: "The input body does not validate the schema",
        errors: result.error.errors.map((err) => err.message),
      });
    }
  } catch (error) {
    // console.error(error);
    return c.json({
      message: "Internal Server Error",
    });
  }
}

export default uservalidation;
