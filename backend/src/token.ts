import jwt from "@tsndr/cloudflare-worker-jwt";
import jwt_token from "../config";

async function tokengenereate(email: string, password: string) {
  const token: string = await jwt.sign({ email, password }, jwt_token);
  return token;
}

export default tokengenereate;
