import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { verifyToken } from "@/utils/auth";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return false;
  }

  try {
    connectToDB();

    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "You Are Not Logged In!" });
    }

    const tokenPayload = verifyToken(token);

    if (!tokenPayload) {
      return res.status(401).json({ message: "You Are Not Logged In!" });
    }

    const user = await UserModel.findOne(
      {
        email: tokenPayload.email,
      },
      "firstname lastname role"
    );

    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(500).json({ message: "Unknown Internal Server Error." });
  }
};

export default handler;
