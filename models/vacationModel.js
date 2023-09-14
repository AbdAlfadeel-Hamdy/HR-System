import { Schema, model } from "mongoose";
import Employee from "./EmployeeModel.js";

const vacationSchema = new Schema({
  employeeId: {
    type: Schema.ObjectId,
    ref: "Employee",
  },
  idNumber: Number,
  employeeName: String,
  leavingDate: Date,
  expectedReturnDate: Date,
  actualReturnDate: Date,
});

vacationSchema.pre("save", async function () {
  console.log(this.idNumber);
  console.log(this._id);
  const em = await Employee.updateOne(
    { idNumber: this.idNumber },
    {
      $push: { vacations: this._id },
      licenseType: "Car",
    }
  );
  const user = await Employee.findOne({ idNumber: this.idNumber });
  console.log(user);
});

export default model("Vacation", vacationSchema);
