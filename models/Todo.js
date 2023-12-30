const { default: mongoose, mongo } = require("mongoose");
const UserModel = require("./User");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Todo || mongoose.model("Todo", schema);

export default model;
