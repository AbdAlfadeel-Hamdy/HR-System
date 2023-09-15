import { Schema, model } from "mongoose";
import dayjs from "dayjs";
import Employee from "./EmployeeModel.js";

const vacationSchema = new Schema(
  {
    employeeId: {
      type: Schema.ObjectId,
      ref: "Employee",
    },
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

vacationSchema.pre("save", async function () {
  console.log("a7a");
  await Employee.updateOne(
    { idNumber: this.idNumber },
    {
      $push: { vacations: this._id },
      licenseType: "Car",
    }
  );
});

export default model("Vacation", vacationSchema);
