import { Schema, model } from "mongoose";
import { USER_ROLES } from "../utils/constants.js";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
  },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default model("User", userSchema);
