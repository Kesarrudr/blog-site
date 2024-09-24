import { Context, Next } from "hono";
import jwt from "@tsndr/cloudflare-worker-jwt";
import jwt_token from "../../config";

async function verifyUser(c: Context, next: Next) {
  try {
    const token = c.req.header("Authorization");
    // console.log(token);
    if (token) {
      const result = await jwt.verify(token, jwt_token);
      if (result == false) {
        return c.json(
          {
            message: "can't be verified",
          },
          { status: 404 },
        );
      } else {
        await next();
      }
    }
  } catch (error) {
    return c.json(
      {
        message: "something is wrong with the verify middle ware",
      },
      { status: 500 },
    );
  }
}
export default verifyUser;
