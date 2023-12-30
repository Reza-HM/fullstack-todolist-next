import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateToken, hashPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }

  try {
    connectToDB();
    const { firstname, lastname, username, email, password } = req.body;

    // Valiadation ✅
    // isUserExist ✅
    // HashPassword ✅
    // GenerateToken ✅
    // Create ✅

    ///////////////////////

    // Valiadation ✅

    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return res.status(422).json({ message: "Data is Not Valid!" });
    }

    // isUserExist ✅

    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res
        .status(422)
        .json({ message: "This Username Or Email Already Exists." });
    }

    // HashPassword ✅

    const hashedPassword = await hashPassword(password);

    // GenerateToken ✅

    const token = generateToken({
      email,
    });

    //

    const users = await UserModel.find({});

    // Create ✅

    await UserModel.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      role: users.length > 0 ? "USER" : "ADMIN",
    });

    return res
      .setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24,
        })
      )
      .status(201)
      .json({ message: "User Created Successfully", token });
  } catch (err) {
    return res.status(500).json({ message: "Unknown Internal Server Error." });
  }
};

export default handler;
