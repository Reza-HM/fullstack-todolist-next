const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect("mongodb://localhost:27017/todolist");
      console.log("DB is Connected!");
    }
  } catch (err) {
    console.log("DB Connection Has Error: ", err);
  }
};

export default connectToDB;
