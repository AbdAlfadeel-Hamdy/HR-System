import { Schema, model } from "mongoose";
import dayjs from "dayjs";
import Employee from "./EmployeeModel.js";

const vacationSchema = new Schema(
  {
    idNumber: Number,
    employeeName: String,
    leavingDate: Date,
    expectedReturnDate: Date,
    actualReturnDate: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

vacationSchema.virtual("period").get(function () {
  return dayjs(this.expectedReturnDate).diff(this.leavingDate, "day");
});
vacationSchema.virtual("actualPeriod").get(function () {
  if (!this.actualReturnDate) return;
  return dayjs(this.actualReturnDate).diff(this.leavingDate, "day");
});

vacationSchema.pre("save", async function () {
  await Employee.updateOne(
    { idNumber: this.idNumber },
    {
      $push: { vacations: this._id },
    }
  );
});

export default model("Vacation", vacationSchema);
