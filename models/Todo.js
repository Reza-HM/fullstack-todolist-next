const { default: mongoose, mongo } = require("mongoose");
const { schema: userSchema } = require("./User");
const UserModel = require("./User");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    user: {
      type: userSchema,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Todo || mongoose.model("Todo", schema);

export default model;
