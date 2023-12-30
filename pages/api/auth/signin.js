import connectToDB from "@/configs/db";
import UserModel from "@/model/User";
import { generateToken, hashPassword, verifyPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }

  try {
    connectToDB();

    const { identifier, password } = req.body;

    if (!identifier.trim() || !password.trim()) {
      return res.status(422).json({ message: "Data in Not Valid!" });
    }

    const user = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return res
        .status(422)
        .json({ message: "username or password is wrong." });
    }

    const token = generateToken({ email: user.email });

    return res
      .setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24,
        })
      )
      .status(200)
      .json({ message: "User Logged In Successfully", token });
  } catch (err) {
    return res.status(500).json({ message: "Unknown Internal Server Error." });
  }
};

export default handler;
