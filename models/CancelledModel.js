import { Schema, model } from "mongoose";

const cancelledSchema = new Schema(
  {
    name: String,
    idNumber: Number,
  },
  {
    timestamps: true,
  }
);

export default model("Cancelled", cancelledSchema);
