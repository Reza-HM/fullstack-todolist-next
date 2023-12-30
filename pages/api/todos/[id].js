import UserModel from "@/models/User";
import TodoModel from "@/models/Todo";
import { verifyToken } from "@/utils/auth";
import connectToDB from "@/configs/db";

const handler = (req, res) => {
  connectToDB();

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "You Are Not Logged In!" });
  }

  const tokenPayload = verifyToken(token);

  if (!tokenPayload) {
    return res.status(401).json({ message: "You Are Not Logged In!" });
  }
};

export default handler;
