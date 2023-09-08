import { Schema, model } from "mongoose";

const cancelledUserSchema = new Schema({
  name: String,
  idNumber: Number,
  idExpirationDate: Date,
  sponsor: String,
  workIn: Date,
  note: String,
});

export default model("CancelledUser", cancelledUserSchema);
