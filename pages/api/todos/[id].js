import UserModel from "@/models/User";
import TodoModel from "@/models/Todo";
import { verifyToken } from "@/utils/auth";
import connectToDB from "@/configs/db";

const handler = async (req, res) => {
  connectToDB();

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "You Are Not Logged In!" });
  }

  const tokenPayload = verifyToken(token);

  if (!tokenPayload) {
    return res.status(401).json({ message: "You Are Not Logged In!" });
  }

  const user = await UserModel.findOne({ email: tokenPayload.email });

  if (!user) {
    return res.status(404).json({ message: "User Not Found!" });
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const removedTodo = await TodoModel.findOneAndDelete({ _id: id });
      return res.json({ message: "Todo Removed Successfully!" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Unknown Internal Server Error." });
    }
  }
};

export default handler;
