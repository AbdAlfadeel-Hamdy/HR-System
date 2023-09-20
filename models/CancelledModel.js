import { Schema, model } from "mongoose";

const cancelledSchema = new Schema(
  {
    name: String,
    idNumber: Number,
    cancellationDate: Date,
  },
  {
    timestamps: true,
  }
);

export default model("Cancelled", cancelledSchema);
